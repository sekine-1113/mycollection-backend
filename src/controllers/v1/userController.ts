import express, { NextFunction, Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { HTTPException } from '../../error';
import { verifyToken } from '../../middlewares/authenticate';
import { JWTBody } from '../..';
import { validateRequest } from '../../middlewares/validate';
import { RegisterUserSchema } from '../../schemas/userSchema';
import { z } from 'zod';

export const userRouter = express.Router();
const userService = new UserService();

userRouter.post(
  '/register',
  validateRequest(RegisterUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
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
      res.status(500).send();
      return;
    }
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
