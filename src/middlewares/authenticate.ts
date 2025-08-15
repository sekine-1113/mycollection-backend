import type express from 'express';
import { HTTPException } from '../error';

const validAuthorizationHeaders = (req: express.Request) => {
  if (!req.headers.authorization) {
    return false;
  }
  if (!req.headers.authorization.startsWith('Bearer ')) {
    return false;
  }
  const token = req.headers.authorization.split(' ').at(-1);
  if (!token) {
    return false;
  }
  return true;
};

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  if (process.env.NODE_ENV === 'develop') {
    const decoded = { role: 'admin', firebaseUid: 'dummy' };
    req.decoded = decoded;
    return next();
  }
  if (!validAuthorizationHeaders(req)) {
    throw new HTTPException('Unauthorized');
  }
  try {
    const decoded = { role: 'admin', firebaseUid: 'dummy' };
    req.decoded = decoded;
    return next();
  } catch (err) {
    if (err instanceof HTTPException) {
      throw err;
    }
    throw new HTTPException('Unauthorized', {
      detailMessage: 'トークンの認証に失敗しました。',
    });
  }
};

export const requirePermission = (minPermission?: string) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> => {
    const userRole = req.decoded?.role;
    if (!userRole) {
      throw new HTTPException('Unauthorized');
    }
    if (userRole) {
      return next();
    }
    throw new HTTPException('Forbidden');
  };
};
