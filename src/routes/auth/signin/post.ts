import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import { Request, Response } from 'express';
import { defineHandler } from '../../../middlewares/handlers';

export const SignInUserSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
  responses: {
    200: {
      description: 'Success',
      body: z.object({
        token: z.string(),
      }),
    },
  },
});

export const signInHandler = defineHandler(
  async (req: Request, res: Response) => {},
);
