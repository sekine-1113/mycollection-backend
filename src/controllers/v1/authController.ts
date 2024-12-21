import express, { Request, Response } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../../config';
import { verifyToken } from '../../middlewares/authenticate';
import { UserService } from '../../services/userService';

export const authRouter = express.Router();
const userService = new UserService();

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { login_id: loginId, password: rawPassword } = req.body;
    if (!loginId || !rawPassword) {
      res.status(401).json({ message: 'loginid or password' });
      return;
    }
    const user = await userService.loginUser(loginId, rawPassword);
    if (!user) {
      res.status(404).json({ message: 'Not Found' });
      return;
    }
    if (!config.jwt.secret) {
      res.status(500).json({ message: 'Sever error' });
      return;
    }
    const token = jwt.sign(
      { id: user.id, displayName: user.display_name ?? user.username },
      config.jwt.secret as Secret,
      config.jwt.options as SignOptions,
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.setHeader('authorization', token);
    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
});

authRouter.post('/logout', verifyToken, async (req: Request, res: Response) => {
  const decoded = req.body.decoded;
  res.cookie('token', null, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  res.status(200).json({ username: decoded.displayName, token: decoded.token });
});
