import { Router } from 'express';
import { validateRequest } from '../../middlewares/validate';
import type { RouterHandler } from '../../types';
import { loginHandler, loginSchema } from './login';

export const authRouter = Router();

export const authRouterHandlers: RouterHandler[] = [
  {
    method: 'post',
    path: '/login',
    handlers: [validateRequest(loginSchema), loginHandler],
    security: false,
    schema: loginSchema,
  },
];
