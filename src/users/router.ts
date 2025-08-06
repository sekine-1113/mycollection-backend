import { Router } from 'express';
import { verifyToken } from '../middlewares/authenticate';
import { validateRequest } from '../middlewares/validate';
import {
  CreateUserProfileSchema,
  DetailUserSchema,
  ListUserSchema,
  UpdateUserProfileSchema,
} from './schema/userSchema';
import { listUsersHandler } from './controller/searchUsers';
import { userDetailHandler } from './controller/detail';
import { createUserProfileHandler } from './controller/me/profile/createUserProfile';
import { updateUserProfileHandler } from './controller/me/profile/updateUserProfile';

export const usersRouter = Router();

usersRouter.get('/me', verifyToken);
usersRouter.put('/me', verifyToken);
usersRouter.delete('/me', verifyToken);
usersRouter.post(
  '/me/profile',
  verifyToken,
  validateRequest(CreateUserProfileSchema),
  createUserProfileHandler,
);
usersRouter.put(
  '/me/profile',
  verifyToken,
  validateRequest(UpdateUserProfileSchema),
  updateUserProfileHandler,
);
usersRouter.get('/me/logins', verifyToken);
usersRouter.get('/me/posts', verifyToken);
usersRouter.get(
  '/',
  verifyToken,
  validateRequest(ListUserSchema),
  listUsersHandler,
);
usersRouter.get(
  '/:publicId',
  verifyToken,
  validateRequest(DetailUserSchema),
  userDetailHandler,
);
usersRouter.get('/:publicId/posts', verifyToken);
