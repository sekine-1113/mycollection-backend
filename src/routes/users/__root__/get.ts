import { Request, Response } from 'express';
import { defineHandler } from '../../../middlewares/handlers';
import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import prisma from '../../../lib/prisma';

export const ListUserSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({}),
  responses: {
    200: {
      description: 'Success',
      body: z.object({
        list: z.array(
          z.object({
            public_id: z.string(),
            profile: z.object({
              icon_url: z.string(),
              display_name: z.string(),
              is_public: z.boolean(),
            }),
          }),
        ),
      }),
    },
  },
});

export const listUserHandler = defineHandler(
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      where: { profile: { isPublic: true } },
      include: { profile: true },
    });
    const responseData = {
      list: users.map((user) => ({
        public_id: user.publicId,
        profile: user.profile && {
          icon_url: user.profile.iconUrl,
          display_name: user.profile.displayName,
          is_public: user.profile.isPublic,
        },
      })),
    };
    const validatedResponse =
      ListUserSchema.responses[200].body.parse(responseData);
    res.status(200).json(validatedResponse);
  },
);
