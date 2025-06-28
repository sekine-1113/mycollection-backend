import express, { NextFunction, Request, Response } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../../config';
import { verifyToken } from '../../middlewares/authenticate';
import { UserService } from '../../services/userService';
import { HTTPException } from '../../error';

export const authRouter = express.Router();
const userService = new UserService();

authRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email: email, password: rawPassword } = req.body;
      if (!email || !rawPassword) throw new HTTPException('BadRequest');
      const user = await userService.loginUser(email, rawPassword);
      if (!user) throw new HTTPException('NotFound');
      if (!config.jwt.secret) throw new HTTPException('InternalServerError');
      const token = jwt.sign(
        { id: user.public_id, displayName: user.display_name ?? user.username },
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
      if (err instanceof HTTPException) {
        next(err);
      } else {
        next(new HTTPException('InternalServerError'));
      }
    }
  },
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
