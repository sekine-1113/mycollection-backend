import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { authRouter } from './auth/authRouter';
import { userRouter } from './users/userRouter';
import { openApiDocument } from './swagger/openapi';
import { errorHandler, debugHandler } from './middlewares/handlers';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import cookieParser from 'cookie-parser';
import config from './config';
import { authRateLimiter, userRateLimiter } from './middlewares/rateLimit';

extendZodWithOpenApi(z);

if (!config.ACCESS_SECRET || !config.REFRESH_SECRET) {
  console.error('config が 設定されていません。');
}

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

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(openApiDocument));
if (process.env.NODE_ENV === 'develop' || true) {
  app.use(debugHandler);
}

// app.use('/api/v1', apiLimiter);
app.use('/api/v1/auth', authRateLimiter, authRouter);
app.use('/api/v1/users', userRateLimiter, userRouter);
// app.use("/api/v1/admin/")

app.use(errorHandler);

export default app;
