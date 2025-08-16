import { Request, Response } from 'express';
import { defineHandler } from '../../../middlewares/handlers';
import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import prisma from '../../../lib/prisma';

export const ListUserSchema = createSchema({
  params: z.object({}),
  query: z.object({
    q: z.string().optional(),
    displayName: z.string().optional(),
    sort: z.string().optional(),
    orderBy: z.string().optional(),
  }),
  body: z.object({}),
  responses: {
    200: {
      description: 'Success',
      body: z.object({
        list: z.array(
          z.object({
            publicId: z.string(),
            profile: z.object({
              iconUrl: z.string(),
              displayName: z.string(),
              isPublic: z.boolean(),
            }),
            postsCount: z.number(),
          }),
        ),
      }),
    },
  },
});

export const listUserHandler = defineHandler(
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      where: { profile: { isPublic: true }, deleted: null },
      include: { profile: true, posts: true },
    });
    const responseData = {
      list: users.map((user) => ({
        publicId: user.publicId,
        profile: user.profile && {
          iconUrl: user.profile.iconUrl,
          displayName: user.profile.displayName,
          isPublic: user.profile.isPublic,
        },
        postsCount: user.posts.length,
      })),
    };
    const validatedResponse =
      ListUserSchema.responses[200].body.parse(responseData);
    res.status(200).json(validatedResponse);
  },
);
