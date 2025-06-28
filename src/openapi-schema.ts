import { LoginUserSchema } from './schemas/authSchema';
import { RegisterUserSchema } from './schemas/userSchema';
import { OpenAPISchemaType } from './types';

export const openAPISchemas: OpenAPISchemaType[] = [
  {
    method: 'post',
    path: '/user/register',
    schema: RegisterUserSchema,
  },
  {
    method: 'post',
    path: '/auth/login',
    schema: LoginUserSchema,
  },
];
