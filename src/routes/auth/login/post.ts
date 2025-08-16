import { createUserWithProfile } from '../../../domain/user';
import prisma from '../../../lib/prisma';
import { defineHandler } from '../../../middlewares/handlers';
import z from '../../../lib/zod';
import { createSchema } from '../../../utils';

export const loginSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    user: z.object({
      email: z.string(),
      username: z.string(),
      firebaseUid: z.string(),
    }),
    profile: z
      .object({
        iconUrl: z.string(),
        displayName: z.string(),
        isPublic: z.boolean(),
      })
      .optional(),
  }),
  responses: {
    204: {
      description: 'Success',
      body: z.object({}),
    },
    500: {
      description: 'Server Error',
      body: z.object({
        message: z.string(),
      }),
    },
  },
});

export const loginHandler = defineHandler(async (req, res) => {
  const body = req.body as z.infer<typeof loginSchema.body>;
  const { user: userModel, profile: profileModel } = createUserWithProfile({
    user: body.user,
    profile: body.profile,
  });
  await prisma.$transaction(async (tx) => {
    const deletedUser = await tx.deletedUser.findUnique({
      where: { firebaseUid: userModel.firebaseUid },
    });
    await tx.user.upsert({
      where: { firebaseUid: userModel.firebaseUid },
      update: {
        logins: {
          create: {
            loggedInAt: new Date(),
          },
        },
        ...(deletedUser
          ? {
              deleted: {
                delete: {
                  firebaseUid: userModel.firebaseUid,
                },
              },
            }
          : {}),
      },
      create: {
        firebaseUid: userModel.firebaseUid,
        email: userModel.email,
        username: userModel.username,
        roleId: userModel.roleId,
        profile: {
          create: {
            displayName: profileModel.displayName ?? '',
            iconUrl: profileModel.iconUrl ?? '',
            isPublic: profileModel.isPublic,
          },
        },
        logins: {
          create: {
            loggedInAt: new Date(),
          },
        },
      },
      include: {
        profile: true,
        logins: {
          orderBy: { loggedInAt: 'desc' },
          take: 1,
        },
      },
    });
  });

  res.status(204).json({});
});
