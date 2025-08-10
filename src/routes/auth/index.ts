import { Router } from 'express';
import { validateRequest } from '../../middlewares/validate';
import { signUpHandler, SignUpUserSchema } from './signup';
import { signInHandler, SignInUserSchema } from './signin';
import type { RouterHandler } from '../../types';

export const authRouter = Router();

export const authRouterHandlers: RouterHandler[] = [
  {
    method: 'post',
    path: '/signup',
    handlers: [validateRequest(SignUpUserSchema), signUpHandler],
    security: false,
    schema: SignUpUserSchema,
  },
  {
    method: 'post',
    path: '/signin',
    handlers: [validateRequest(SignInUserSchema), signInHandler],
    security: false,
    schema: SignInUserSchema,
  },
];
