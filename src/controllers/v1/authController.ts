import express, { Request, Response } from 'express';
import { verifyToken } from '../../middlewares/authenticate';
import { UserService } from '../../services/userService';
import { HTTPException } from '../../error';
import { defineHandler } from '../../middlewares/handlers';
import { AuthService } from '../../services/authService';
import { validateRequest } from '../../middlewares/validate';
import { RegisterUserSchema } from '../../schemas/userSchema';
import z from 'zod';
import { LoginUserSchema } from '../../schemas/authSchema';

export const authRouter = express.Router();
const userService = new UserService();
const authService = new AuthService();

authRouter.post(
  '/signup',
  validateRequest(RegisterUserSchema),
  defineHandler(async (req: Request, res: Response) => {
    const {
      email: email,
      password: rawPassword,
      username: username,
    } = req.validatedBody as z.infer<typeof RegisterUserSchema.body>;
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
  }),
);

authRouter.post(
  '/signin',
  validateRequest(LoginUserSchema),
  defineHandler(async (req: Request, res: Response) => {
    const { email: email, password: rawPassword } =
      req.validatedBody as z.infer<typeof LoginUserSchema.body>;
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
  }),
);

authRouter.post(
  '/signout',
  verifyToken,
  async (req: Request, res: Response) => {
    res.cookie('token', null, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(204).json({});
  },
);
