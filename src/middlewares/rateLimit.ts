import rateLimit from 'express-rate-limit';
import { Request } from 'express';
import { randomUUID } from 'crypto';

export const standardRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const permissionLimits: Record<string, number> = {
  ADMIN: 200,
  USER: 50,
  GUEST: 20,
};

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: permissionLimits.GUEST,
  keyGenerator: (req) => req.ip ?? randomUUID(),
  message: 'Too many auth requests',
  standardHeaders: true,
  legacyHeaders: false,
});

export const usersRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: Request) => {
    const user = req.user;
    if (!user) return permissionLimits.GUEST;
    return permissionLimits.USER;
  },
  keyGenerator: (req) =>
    req.user ? `user:${req.user.firebaseUid}` : (req.ip ?? randomUUID()),
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});
