import { LoginUserSchema, LogoutUserSchema } from './schemas/authSchema';
import {
  CreateUserProfileSchema,
  DetailUserSchema,
  ListUserSchema,
  RegisterUserSchema,
  UpdateUserProfileSchema,
} from './schemas/userSchema';
import { OpenAPISchemaType } from './types';

export const openAPISchemas: OpenAPISchemaType[] = [
  {
    method: 'get',
    path: '/users',
    security: true,
    schema: ListUserSchema,
  },
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
  {
    method: 'post',
    path: '/auth/signup',
    security: false,
    schema: RegisterUserSchema,
  },
  {
    method: 'post',
    path: '/auth/login',
    security: false,
    schema: LoginUserSchema,
  },
  {
    method: 'post',
    path: '/auth/logout',
    security: true,
    schema: LogoutUserSchema,
  },
];
