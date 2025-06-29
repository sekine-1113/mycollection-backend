import {
  CreateUserProfileSchema,
  DetailUserSchema,
  ListUserSchema,
  UpdateUserProfileSchema,
} from '../../user/schema/userSchema';
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
    { method: 'get', path: '/users', security: true, schema: ListUserSchema },
    {
      method: 'get',
      path: '/users/{publicId}',
      security: true,
      schema: DetailUserSchema,
    },
    {
      method: 'post',
      path: '/users/{publicId}',
      security: true,
      schema: CreateUserProfileSchema,
    },
    {
      method: 'put',
      path: '/users/{publicId}',
      security: true,
      schema: UpdateUserProfileSchema,
    },
  ]),
];
