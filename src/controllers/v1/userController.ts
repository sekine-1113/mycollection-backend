import express, { NextFunction, Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { HTTPException } from '../../error';
import { verifyToken } from '../../middlewares/authenticate';
import { JWTBody } from '../..';
import { validateRequest } from '../../middlewares/validate';
import { RegisterUserSchema } from '../../schemas/userSchema';
import { z } from 'zod';
import { defineHandler } from '../../middlewares/handlers';

export const userRouter = express.Router();
const userService = new UserService();

userRouter.post(
  '/register',
  validateRequest(RegisterUserSchema),
  defineHandler(async (req: Request, res: Response) => {
    const {
      email: email,
      password: rawPassword,
      username: username,
      display_name: displayName,
    } = res.locals.validatedBody as z.infer<typeof RegisterUserSchema.body>;
    const createdUser = await userService.registerUser(
      rawPassword,
      username,
      email,
      displayName,
    );
    if (!createdUser) {
      throw new HTTPException('InternalServerError', {
        detailMessage: 'ユーザ作成に失敗しました。',
      });
    }
    res.status(201).json({});
  }),
);

userRouter.get(
  '/mypage',
  verifyToken,
  defineHandler(async (req: Request, res: Response) => {
    const decoded: JWTBody = req.body.decoded;
    res.status(200).json({ decoded });
  }),
);
