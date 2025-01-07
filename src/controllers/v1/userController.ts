import express, { NextFunction, Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { HTTPException } from '../../error';
import { verifyToken } from '../../middlewares/authenticate';
import { JWTBody } from '../..';

export const userRouter = express.Router();
const userService = new UserService();

userRouter.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      login_id: loginId,
      password: rawPassword,
      username: username,
      display_name: displayName,
    }: {
      login_id: string;
      password: string;
      username: string;
      display_name: string | null;
    } = req.body;
    if (rawPassword.length < 8) throw new HTTPException('BadRequest');
    const createdUser = await userService.registerUser(
      loginId,
      rawPassword,
      username,
      displayName,
    );
    res.status(201).send();
  },
);

userRouter.get(
  '/mypage',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const decoded: JWTBody = req.body.decoded;
    res.status(200).json({ decoded });
  },
);
