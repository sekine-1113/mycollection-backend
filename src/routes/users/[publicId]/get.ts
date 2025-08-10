import { Request, Response } from 'express';
import { userService } from '../service';
import { HTTPException } from '../../../error';
import { defineHandler } from '../../../middlewares/handlers';
import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import { toUserData } from '../dto';

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
        user_public_id: z.string(),
        profile: z.object({
          icon_url: z.string().optional(),
          display_name: z.string().optional(),
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
    const user = await userService.findByPublicId(publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const userData = toUserData(user);
    const validated = DetailUserSchema.responses[200].body.parse(userData);
    res.status(200).json(validated);
  },
);
