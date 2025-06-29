import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { authRouter as authRouterV1 } from './controllers/v1/authController';
import { userRouter } from './routes/users';
import rateLimit from 'express-rate-limit';
import { openApiDocument } from './openapi';
import { errorHandler, loggingHandler } from './middlewares/handlers';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
import cookieParser from 'cookie-parser';
import config from './config';
cookieParser;
extendZodWithOpenApi(z);

if (!config.jwt.secret) {
  console.error('config.jwt.secret が設定されていません。');
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

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
  app.use(loggingHandler);
}
app.use('/api/v1', apiLimiter);
app.use('/api/v1/auth', authRouterV1);
app.use('/api/v1/users', userRouter);
// app.use("/api/v1/admin/")

app.use(errorHandler);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server on ${port}`);
  if (process.env.NODE_ENV === 'develop' || true) {
    console.log('http://localhost:3000/swagger-ui');
  }
});
