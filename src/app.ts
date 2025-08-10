import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { debugHandler, errorHandler } from './middlewares/handlers';
import { authRateLimiter, usersRateLimiter } from './middlewares/rateLimit';
import { authRouter, usersRouter } from './routes';
import { openApiDocument } from './swagger/openapi';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3001'],
    credentials: true,
  }),
);

if (process.env.NODE_ENV === 'develop' || true) {
  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.use(debugHandler);
}

const apiV1Router = Router();
apiV1Router.use('/auth', authRateLimiter, authRouter);
apiV1Router.use('/users', usersRateLimiter, usersRouter);

app.use('/api/v1', apiV1Router);
app.use(errorHandler);

export default app;
