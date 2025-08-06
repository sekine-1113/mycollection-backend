import {
  CreateUserProfileSchema,
  DetailUserSchema,
  ListUserSchema,
  UpdateUserProfileSchema,
} from '../../users/schema/userSchema';
import { Method, SchemaType } from '../../types';
import { createEndpoint } from '../../utils';

const generateUserEndpoints = (
  info: {
    method: Method;
    path: string;
    security: boolean;
    schema: SchemaType;
  }[],
) => {
  return info.map((it) =>
    createEndpoint({
      method: it.method,
      path: it.path,
      security: it.security,
      tags: ['User'],
      schema: it.schema,
    }),
  );
};

export default [
  ...generateUserEndpoints([
    {
      method: 'get',
      path: '/users/me',
      security: true,
      schema: ListUserSchema,
    },
    {
      method: 'put',
      path: '/users/me',
      security: true,
      schema: ListUserSchema,
    },
    {
      method: 'delete',
      path: '/users/me',
      security: true,
      schema: ListUserSchema,
    },
    {
      method: 'post',
      path: '/users/me/profile',
      security: true,
      schema: CreateUserProfileSchema,
    },
    {
      method: 'put',
      path: '/users/me/profile',
      security: true,
      schema: UpdateUserProfileSchema,
    },
    { method: 'get', path: '/users', security: true, schema: ListUserSchema },
    {
      method: 'get',
      path: '/users/{publicId}',
      security: true,
      schema: DetailUserSchema,
    },
  ]),
];
