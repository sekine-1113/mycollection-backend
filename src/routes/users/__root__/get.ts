import { Request, Response } from 'express';
import { userService } from '../service';
import { defineHandler } from '../../../middlewares/handlers';
import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import { toUserData } from '../dto';

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
              icon_url: z.string().nullable(),
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
    const users = await userService.findMany({
      profile: {
        isPublic: true,
      },
    });
    const responseData = {
      list: users.map(
        (user: {
          publicId: string;
          profile: {
            iconUrl: string | null;
            displayName: string | null;
            isPublic: boolean;
          } | null;
        }) => toUserData(user),
      ),
    };
    const validated = ListUserSchema.responses[200].body.parse(responseData);
    res.status(200).json(validated);
  },
);
