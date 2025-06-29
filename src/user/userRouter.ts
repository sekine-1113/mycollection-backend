import express from 'express';
import { verifyToken } from '../middlewares/authenticate';
import { validateRequest } from '../middlewares/validate';
import {
  CreateUserProfileSchema,
  DetailUserSchema,
  ListUserSchema,
  UpdateUserProfileSchema,
} from './schema/userSchema';
import {
  createUserProfileHandler,
  updateUserProfileHandler,
  userDetailHandler,
  usersHandler,
} from './controller/userController';

export const userRouter = express.Router();

userRouter.get('/', verifyToken, validateRequest(ListUserSchema), usersHandler);
userRouter.get(
  '/:publicId',
  verifyToken,
  validateRequest(DetailUserSchema),
  userDetailHandler,
);
userRouter.post(
  '/:publicId',
  verifyToken,
  validateRequest(CreateUserProfileSchema),
  createUserProfileHandler,
);
userRouter.put(
  '/:publicId',
  verifyToken,
  validateRequest(UpdateUserProfileSchema),
  updateUserProfileHandler,
);
