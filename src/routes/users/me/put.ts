import { Request, Response } from 'express';
import { defineHandler } from '../../../middlewares/handlers';
import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import { HTTPException } from '../../../error';
import prisma from '../../../lib/prisma';

export const UpdateUserMeSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    user: z.object({
      username: z.string(),
    }),
    profile: z.object({
      iconUrl: z.string(),
      displayName: z.string(),
      isPublic: z.boolean(),
    }),
  }),
  responses: {
    200: {
      description: 'Success',
      body: z.object({
        publicId: z.string(),
        profile: z.object({
          iconUrl: z.string(),
          displayName: z.string(),
          isPublic: z.boolean(),
        }),
      }),
    },
  },
});

export const updateUserMeHandler = defineHandler(
  async (req: Request, res: Response) => {
    const body = req.body as z.infer<typeof UpdateUserMeSchema.body>;
    const firebaseUid = req.user?.firebaseUid;
    if (!firebaseUid) {
      throw new HTTPException('Unauthorized');
    }
    const user = await prisma.user.update({
      where: { firebaseUid: firebaseUid },
      data: {
        username: body.user.username,
        profile: {
          update: {
            iconUrl: body.profile.iconUrl,
            displayName: body.profile.displayName,
            isPublic: body.profile.isPublic,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    const validatedResponse = UpdateUserMeSchema.responses[200].body.parse({
      publicId: user.publicId,
      profile: {
        iconUrl: user.profile?.iconUrl ?? '',
        displayName: user.profile?.displayName ?? '',
        isPublic: user.profile?.isPublic ?? false,
      },
    });
    res.status(200).json(validatedResponse);
  },
);
