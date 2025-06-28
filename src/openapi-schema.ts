import {
  LoginUserSchema,
  RegisterUserSchema,
  SchemaType,
} from './schemas/userSchema';

type Method = 'get' | 'post' | 'put' | 'delete';
export const openAPISchemas: {
  method: Method;
  path: string;
  schema: SchemaType;
}[] = [
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
