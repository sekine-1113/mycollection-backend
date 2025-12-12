import type express from 'express';
import { auth } from '../lib/firebase';
import { generateTmpEmail } from '../utils';
import { ErrorTypes, HTTPException } from '../error';

type ObtainTokenResult =
  | {
      token: string;
      error?: null;
    }
  | { token: null; error: { type: keyof typeof ErrorTypes; message: string } };

const obtainAuthorizationHeaders = (
  req: express.Request,
): ObtainTokenResult => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return {
      token: null,
      error: { type: 'Unauthorized', message: 'トークンがありません。' },
    };
  }
  if (!authorization.startsWith('Bearer ')) {
    return {
      token: null,
      error: { type: 'Unauthorized', message: 'トークンがありません。' },
    };
  }
  const token = authorization.slice(7);
  if (!token) {
    return {
      token: null,
      error: { type: 'Unauthorized', message: 'トークンがありません。' },
    };
  }
  return { token };
};

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  if (process.env.NODE_ENV === 'develop') {
    const decoded = { firebaseUid: 'dummy', email: 'test@example.com' };
    req.user = decoded;
    return next();
  }
  const { token, error } = obtainAuthorizationHeaders(req);
  if (error) {
    throw new HTTPException(error.type, { message: error.message });
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = {
      firebaseUid: decoded.uid,
      email: decoded.email ?? generateTmpEmail(),
    };
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
