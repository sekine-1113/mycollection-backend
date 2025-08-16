import { Router } from 'express';
import { verifyToken } from '../../middlewares/authenticate';
import { validateRequest } from '../../middlewares/validate';
import { ListUserSchema, listUserHandler } from './__root__';
import { DetailUserSchema, userDetailHandler } from './[publicId]';
import type { RouterHandler } from '../../types';
import { dummyHandler } from '../../middlewares/handlers';
import {
  userMeHandler,
  UsersMeSchema,
  userMeDeleteHandler,
  UsersMeDeleteSchema,
  userLoginsHandler,
  UserLoginsSchema,
} from './me';
import { updateUserMeHandler, UpdateUserMeSchema } from './me/put';

export const usersRouter = Router();

export const usersRouterHandlers: RouterHandler[] = [
  {
    method: 'get',
    path: '/me',
    handlers: [verifyToken, validateRequest(UsersMeSchema), userMeHandler],
    security: true,
    schema: UsersMeSchema,
  },
  {
    method: 'put',
    path: '/me',
    handlers: [
      verifyToken,
      validateRequest(UpdateUserMeSchema),
      updateUserMeHandler,
    ],
    security: true,
    schema: UpdateUserMeSchema,
  },
  {
    method: 'delete',
    path: '/me',
    handlers: [
      verifyToken,
      validateRequest(UsersMeDeleteSchema),
      userMeDeleteHandler,
    ],
    security: true,
    schema: UsersMeDeleteSchema,
  },
  {
    method: 'get',
    path: '/me/logins',
    handlers: [
      verifyToken,
      validateRequest(UserLoginsSchema),
      userLoginsHandler,
    ],
    security: true,
    schema: UserLoginsSchema,
  },
  {
    method: 'get',
    path: '',
    handlers: [verifyToken, validateRequest(ListUserSchema), listUserHandler],
    security: true,
    schema: ListUserSchema,
  },
  {
    method: 'get',
    path: '/:publicId',
    swaggerPath: '/{publicId}',
    handlers: [
      verifyToken,
      validateRequest(DetailUserSchema),
      userDetailHandler,
    ],
    security: true,
    schema: DetailUserSchema,
  },
];
