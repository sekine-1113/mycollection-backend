import express, { NextFunction, Request, Response } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../../config';
import { verifyToken } from '../../middlewares/authenticate';
import { UserService } from '../../services/userService';
import { HTTPException } from '../../error';
import { defineHandler } from '../../middlewares/handlers';
import { AuthService } from '../../services/authService';

export const authRouter = express.Router();
const userService = new UserService();
const authService = new AuthService();
authRouter.post(
  '/login',
  defineHandler(async (req: Request, res: Response) => {
    const { email: email, password: rawPassword } = req.body;
    if (!email || !rawPassword)
      throw new HTTPException('BadRequest', {
        detailMessage: 'email または password が入力されていません。',
      });
    try {
      const { token } = await authService.login(email, rawPassword);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      res.setHeader('authorization', token);
      res.status(200).json({ token });
    } catch (err) {
      if (err instanceof HTTPException) {
        throw err;
      }
      throw new HTTPException('InternalServerError', {
        detailMessage: 'ログイン処理中にエラーが発生しました。',
      });
    }
  }),
);

authRouter.post('/logout', verifyToken, async (req: Request, res: Response) => {
  const decoded = req.body.decoded;
  res.cookie('token', null, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  res.status(200).json({ username: decoded.displayName, token: decoded.token });
});
