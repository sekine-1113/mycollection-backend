import type express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { JWTBody } from '..';

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const token = req.headers.authorization ?? '';
    const bearer = token.split(' ').at(-1) ?? '';
    if (!config.jwt.secret) {
      res.status(500).json({ message: 'Sever error' });
      return;
    }
    const decoded = jwt.verify(bearer, config.jwt.secret);
    req.body.decoded = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Not authenticated',
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
    res.status(403).json({
      message: 'Forbidden',
    });
  }
};
