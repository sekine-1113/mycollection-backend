import { RequestHandler, Router } from 'express';
import { validateRequest } from '../../middlewares/validate';
import { Method, SchemaType } from '../../types';
import { signUpHandler, SignUpUserSchema } from './signup';
import { signInHandler, SignInUserSchema } from './signin';

export const authRouter = Router();

export const authRouterHandlers: {
  method: Method;
  path: string;
  handlers: RequestHandler[];
  security: boolean;
  schema: SchemaType;
}[] = [
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
