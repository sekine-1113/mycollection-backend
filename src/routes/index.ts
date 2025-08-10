import { authRouterHandlers, authRouter } from './auth';
import { usersRouterHandlers, usersRouter } from './users';

authRouterHandlers.forEach((it) =>
  authRouter[it.method](it.path, ...it.handlers),
);

usersRouterHandlers.forEach((it) =>
  usersRouter[it.method](it.path, ...it.handlers),
);

export { authRouter, usersRouter };
