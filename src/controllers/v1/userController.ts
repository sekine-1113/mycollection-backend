import express, { Request, Response } from 'express';
import { UserService } from '../../services/userService';

export const userRouter = express.Router();
const userService = new UserService();

userRouter.post('/register', async (req: Request, res: Response) => {
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
  if (rawPassword.length < 8) {
    res.status(401).json({ message: 'password length' });
    return;
  }
  const createdUser = await userService.registerUser(
    loginId,
    rawPassword,
    username,
    displayName,
  );
  res.status(200).json(createdUser);
});
