import express, { Request, Response } from 'express';
import { HTTPException } from '../../error';
import { defineHandler } from '../../middlewares/handlers';
import { authService } from '../service/authService';
import { SignUpUserSchema, SignInUserSchema } from '../schema/authSchema';
import { userService } from '../../users/service/userService';
import { z } from 'zod';

export const authRouter = express.Router();

export const signUpHandler = defineHandler(
  async (req: Request, res: Response) => {
    const {
      email: email,
      password: rawPassword,
      username: username,
    } = req.validatedBody as z.infer<typeof SignUpUserSchema.body>;
    const createdUser = await userService.registerUser(
      email,
      rawPassword,
      username,
    );
    if (!createdUser) {
      throw new HTTPException('InternalServerError', {
        detailMessage: 'ユーザ作成に失敗しました。',
      });
    }
    res.status(201).json({});
  },
);

export const signInHandler = defineHandler(
  async (req: Request, res: Response) => {
    const { email: email, password: rawPassword } =
      req.validatedBody as z.infer<typeof SignInUserSchema.body>;

    if (!email || !rawPassword)
      throw new HTTPException('BadRequest', {
        detailMessage: 'email または password が入力されていません。',
      });
    try {
      const { token } = await authService.login(email);
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      res.setHeader('authorization', `Bearer ${token}`);
      res.status(200).json({ token });
    } catch (err) {
      if (err instanceof HTTPException) {
        throw err;
      }
      throw new HTTPException('InternalServerError', {
        detailMessage: 'ログイン処理中にエラーが発生しました。',
      });
    }
  },
);

export const signOutHandler = defineHandler(
  async (req: Request, res: Response) => {
    res.cookie('token', null, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(204).json({});
  },
);

export const refreshHandler = defineHandler(
  async (req: Request, res: Response) => {},
);
