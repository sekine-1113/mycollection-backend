import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import prisma from './prisma';

cron.schedule('0 0 * * *', async () => {
  const accessLogRetentionPeriod = 180;
  const systemLogRetentionPeriod = 365;
  const accessLogCutoffDate = new Date();
  accessLogCutoffDate.setDate(
    accessLogCutoffDate.getDate() - accessLogRetentionPeriod
  );
  const systemLogCutoffDate = new Date();
  systemLogCutoffDate.setDate(
    systemLogCutoffDate.getDate() - systemLogRetentionPeriod
  );

  try {
    await prisma.accessLog.deleteMany({
      where: {
        created_at: {
          lt: accessLogCutoffDate,
        },
      },
    });
    await prisma.systemLog.deleteMany({
      where: {
        created_at: {
          lt: systemLogCutoffDate,
        },
      },
    });
    console.log('Old logs deleted successfully');
  } catch (error) {
    console.error('Error deleting old logs:', error);
  }
});

import { authRouter as authRouterV1 } from './controllers/v1/authController';
import { mypageRouter } from './controllers/v1/mypageController';
import { userRouter } from './controllers/v1/userController';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1/auth', authRouterV1);
app.use('/api/v1/mypage', mypageRouter);
app.use('/api/v1/user', userRouter);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server on ${port}`);
});
