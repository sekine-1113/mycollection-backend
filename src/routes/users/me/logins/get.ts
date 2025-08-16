import { Request, Response } from 'express';
import { defineHandler } from '../../../../middlewares/handlers';
import z from '../../../../lib/zod';
import { createSchema } from '../../../../utils';
import { HTTPException } from '../../../../error';
import prisma from '../../../../lib/prisma';

export const UserLoginsSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({}),
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
        logins: z.array(z.date()),
      }),
    },
  },
});

export const userLoginsHandler = defineHandler(
  async (req: Request, res: Response) => {
    const firebaseUid = req.user?.firebaseUid;
    if (!firebaseUid) {
      throw new HTTPException('Unauthorized');
    }
    const user = await prisma.user.findUnique({
      where: { firebaseUid, profile: { isPublic: true } },
      include: {
        profile: true,
        logins: {
          select: { loggedInAt: true },
          orderBy: { loggedInAt: 'desc' },
          take: 50,
        },
      },
    });
    if (!user) throw new HTTPException('NotFound');
    const userData = {
      publicId: user.publicId,
      profile: {
        iconUrl: user.profile?.iconUrl,
        displayName: user.profile?.displayName,
        isPublic: user.profile?.isPublic,
      },
      logins: user.logins.map((login) => login.loggedInAt),
    };
    const validatedResponse =
      UserLoginsSchema.responses[200].body.parse(userData);
    res.status(200).json(validatedResponse);
  },
);
