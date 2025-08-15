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
        public_id: z.string(),
        profile: z.object({
          icon_url: z.string(),
          display_name: z.string(),
          is_public: z.boolean(),
        }),
      }),
    },
  },
});

export const userDetailHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded;
    const { publicId } = req.validatedParams as z.infer<
      typeof DetailUserSchema.params
    >;
    const user = await prisma.user.findFirst({
      where: { publicId, profile: { isPublic: true } },
      include: { profile: true },
    });
    if (!user) throw new HTTPException('NotFound');
    const userData = {
      public_id: user.publicId,
      profile: {
        icon_url: user.profile?.iconUrl,
        display_name: user.profile?.displayName,
        is_public: user.profile?.isPublic,
      },
    };
    const validatedResponse =
      DetailUserSchema.responses[200].body.parse(userData);
    res.status(200).json(validatedResponse);
  },
);
