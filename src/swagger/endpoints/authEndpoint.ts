import { Method, SchemaType } from '../../types';
import { createEndpoint } from '../../utils';
import {
  SignInUserSchema,
  SignOutUserSchema,
  SignUpUserSchema,
} from '../../auth/schema/authSchema';

const generateAuthEndpoints = (
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
      tags: ['Auth'],
      schema: it.schema,
    }),
  );
};

export default [
  ...generateAuthEndpoints([
    {
      method: 'post',
      path: '/auth/signup',
      security: false,
      schema: SignUpUserSchema,
    },
    {
      method: 'post',
      path: '/auth/signin',
      security: false,
      schema: SignInUserSchema,
    },
    {
      method: 'post',
      path: '/auth/signout',
      security: true,
      schema: SignOutUserSchema,
    },
  ]),
];
