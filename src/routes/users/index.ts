import { RequestHandler, Router } from 'express';
import { verifyToken } from '../../middlewares/authenticate';
import { validateRequest } from '../../middlewares/validate';
import { Method, SchemaType } from '../../types';
import { ListUserSchema, listUsersHandler } from './__root__';
import { DetailUserSchema, userDetailHandler } from './[publicId]';

export const usersRouter = Router();

export const usersRouterHandlers: {
  method: Method;
  path: string;
  handlers: RequestHandler[];
  security: boolean;
  schema: SchemaType;
}[] = [
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
    handlers: [verifyToken, validateRequest(ListUserSchema), listUsersHandler],
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
