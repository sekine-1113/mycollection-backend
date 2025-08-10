import { generateSchema } from '../utils';
import { usersRouterHandlers } from '../routes/users';
import { authRouterHandlers } from '../routes/auth';

export const openAPISchemas = [
  ...generateSchema('/auth', ['Auth'], authRouterHandlers),
  ...generateSchema('/users', ['Users'], usersRouterHandlers),
];
