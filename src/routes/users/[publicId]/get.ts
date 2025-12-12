import { Request, Response } from 'express';
import { defineHandler } from '../../../middlewares/handlers';
import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import { HTTPException } from '../../../error';
import prisma from '../../../lib/prisma';

export const DetailUserSchema = createSchema({
  params: z.object({
    publicId: z.string(),
  }),
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
        posts: z.array(
          z.object({
            publicId: z.string(),
            caption: z.string(),
            createdAt: z.date(),
            source: z.array(
              z.object({
                publicId: z.string(),
                sourceUrl: z.string(),
                type: z.string(),
              }),
            ),
          }),
        ),
      }),
    },
  },
});

export const userDetailHandler = defineHandler(
  async (req: Request, res: Response) => {
    const { publicId } = req.validatedParams as z.infer<
      typeof DetailUserSchema.params
    >;
    const user = await prisma.user.findUnique({
      where: { publicId, profile: { isPublic: true }, deleted: null },
      include: {
        profile: true,
        posts: { include: { postSource: { include: { type: true } } } },
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
      posts: user.posts.map((post) => {
        const initialValue: {
          publicId: string;
          sourceUrl: string;
          type: string;
        }[] = [];
        return {
          publicId: post.publicId,
          createdAt: post.createdAt,
          caption: post.caption,
          source: post.postSource.reduce((acc, curr) => {
            acc.push({
              publicId: curr.publicId,
              sourceUrl: curr.sourceUrl,
              type: curr.type.name,
            });
            return acc;
          }, initialValue),
        };
      }),
    };
    const validatedResponse =
      DetailUserSchema.responses[200].body.parse(userData);
    res.status(200).json(validatedResponse);
  },
);
