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
  try {
    const token = req.headers.authorization ?? '';
    const bearer = token.split(' ').at(-1) ?? '';
    if (!config.jwt.secret) {
      throw new HTTPException('InternalServerError', {
        detailMessage: 'トークンの認証に失敗しました。',
      });
    }
    const decoded = jwt.verify(bearer, config.jwt.secret);
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

export const checkPermission = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const permission = req.body.decoded.permission;
  if (permission == 1) {
    next();
  } else {
    throw new HTTPException('Forbidden', {
      detailMessage: '許可されていない操作が行われました。',
    });
  }
};
