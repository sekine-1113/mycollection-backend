import type express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { HTTPException } from '../error';
import { JWTBody } from '../types';

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  let token;
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = (req.headers.authorization ?? '').split(' ').at(-1);
  }
  if (!token) {
    throw new HTTPException('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, config.ACCESS_SECRET);
    req.decoded = decoded as JWTBody;
    next();
  } catch (err) {
    if (err instanceof HTTPException) {
      throw err;
    }
    throw new HTTPException('Unauthorized', {
      detailMessage: 'トークンの認証に失敗しました。',
    });
  }
};

export const isAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const permission = req.decoded?.permission;
  if (permission === 'ADMIN') {
    next();
  } else {
    throw new HTTPException('Forbidden', {
      detailMessage: '許可されていない操作が行われました。',
    });
  }
};
