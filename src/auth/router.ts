import { Router } from 'express';
import { verifyToken } from '../middlewares/authenticate';
import { validateRequest } from '../middlewares/validate';
import {
  SignInUserSchema,
  SignOutUserSchema,
  SignUpUserSchema,
} from './schema/authSchema';
import {
  signInHandler,
  signOutHandler,
  signUpHandler,
} from './controller/authController';

export const authRouter = Router();

authRouter.post('/signup', validateRequest(SignUpUserSchema), signUpHandler);
authRouter.post('/signin', validateRequest(SignInUserSchema), signInHandler);
authRouter.post(
  '/signout',
  verifyToken,
  validateRequest(SignOutUserSchema),
  signOutHandler,
);
