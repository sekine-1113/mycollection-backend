import { Router } from 'express';
import { verifyToken } from '../../middlewares/authenticate';
import { validateRequest } from '../../middlewares/validate';
import { ListUserSchema, listUserHandler } from './__root__';
import { DetailUserSchema, userDetailHandler } from './[publicId]';
import type { RouterHandler } from '../../types';

export const usersRouter = Router();

export const usersRouterHandlers: RouterHandler[] = [
  {
    method: 'get',
    path: '/me',
    handlers: [verifyToken],
    security: true,
    schema: ListUserSchema,
  },
  {
    method: 'put',
    path: '/me',
    handlers: [verifyToken],
    security: true,
    schema: ListUserSchema,
  },
  {
    method: 'delete',
    path: '/me',
    handlers: [verifyToken],
    security: true,
    schema: ListUserSchema,
  },
  {
    method: 'get',
    path: '/me/logins',
    handlers: [verifyToken],
    security: true,
    schema: ListUserSchema,
  },
  {
    method: 'get',
    path: '/me/posts',
    handlers: [verifyToken],
    security: true,
    schema: ListUserSchema,
  },
  {
    method: 'get',
    path: '/',
    handlers: [verifyToken, validateRequest(ListUserSchema), listUserHandler],
    security: true,
    schema: ListUserSchema,
  },
  {
    method: 'get',
    path: '/:publicId',
    handlers: [
      verifyToken,
      validateRequest(DetailUserSchema),
      userDetailHandler,
    ],
    security: true,
    schema: DetailUserSchema,
  },
  {
    method: 'get',
    path: '/:publicId/posts',
    handlers: [verifyToken],
    security: true,
    schema: ListUserSchema,
  },
];
