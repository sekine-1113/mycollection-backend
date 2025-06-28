import type { PrismaClient } from '@prisma/client';
import { HTTPException } from '../error';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const defineHandler =
  (
    handler: (
      req: Request,
      res: Response,
      next?: NextFunction,
    ) => Promise<unknown>,
  ): RequestHandler =>
  (req, res, next) => {
    handler(req, res, next).catch(next);
  };

export const loggingHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const method = req.method;
  switch (method.toLowerCase()) {
    case 'get':
      console.log(req.path, req.query, req.params);
      break;
    case 'post':
      console.log(req.path, req.query, req.params, req.body);
      break;
    case 'put':
      console.log(req.path, req.query, req.params, req.body);
      break;
    case 'delete':
      console.log(req.path, req.query, req.params, req.body);
      break;
    default:
      console.log(method, req.path, req.query, req.params, req.body);
      break;
  }
  next();
};

export const errorHandler = (
  err: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res
    .status(err.statusCode ?? 500)
    .json({ message: err.message, details: err.details });
};

export const deleteLogHandler = async (prisma: PrismaClient) => {
  const accessLogRetentionPeriod = 180;
  const systemLogRetentionPeriod = 365;
  const accessLogCutoffDate = new Date();
  accessLogCutoffDate.setDate(
    accessLogCutoffDate.getDate() - accessLogRetentionPeriod,
  );
  const systemLogCutoffDate = new Date();
  systemLogCutoffDate.setDate(
    systemLogCutoffDate.getDate() - systemLogRetentionPeriod,
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
};
