import z from '../../../lib/zod';
import { createSchema } from '../../../utils';
import { Request, Response } from 'express';
import { defineHandler } from '../../../middlewares/handlers';
import { authService } from '../service';

export const SignUpUserSchema = createSchema({
  params: z.object({}),
  query: z.object({}),
  body: z.object({
    email: z.string(),
    username: z.string(),
    firebaseUid: z.string(),
    iconUrl: z.string(),
    displayName: z.string(),
    isPublic: z.boolean(),
  }),
  responses: {
    201: {
      description: 'Success',
      body: z.object({}),
    },
    500: {
      description: 'Server Error',
      body: z.object({
        message: z.string(),
      }),
    },
  },
});

export const signUpHandler = defineHandler(
  async (req: Request, res: Response) => {
    const {
      email: email,
      username: username,
      firebaseUid: firebaseUid,
      iconUrl: iconUrl,
      displayName: displayName,
      isPublic: isPublic,
    } = req.validatedBody as z.infer<typeof SignUpUserSchema.body>;
    const { user, profile } = await authService.signUp(
      email,
      username,
      firebaseUid,
      1,
      iconUrl,
      displayName,
      isPublic,
    );
    res.status(201).json({ user, profile });
  },
);
