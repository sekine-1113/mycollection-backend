import { Request, Response } from 'express';
import { defineHandler } from '../../../middlewares/handlers';
import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import { HTTPException } from '../../../error';
import prisma from '../../../lib/prisma';

export const UsersMeDeleteSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({}),
  responses: {
    204: {
      description: 'Success',
      body: z.object({}),
    },
  },
});

export const userMeDeleteHandler = defineHandler(
  async (req: Request, res: Response) => {
    const firebaseUid = req.user?.firebaseUid;
    if (!firebaseUid) {
      throw new HTTPException('Unauthorized');
    }
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });
    if (!user) throw new HTTPException('NotFound');
    await prisma.deletedUser.create({
      data: {
        firebaseUid: user.firebaseUid,
        deletedAt: new Date(),
      },
    });
    res.status(204).json({});
  },
);
