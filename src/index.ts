import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { authRouter as authRouterV1 } from './controllers/v1/authController';
import { userRouter } from './controllers/v1/userController';
import rateLimit from 'express-rate-limit';
import { openApiDocument } from './openapi';
import { errorHandler, loggingHandler } from './middlewares/handlers';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import z from 'zod';
extendZodWithOpenApi(z);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
