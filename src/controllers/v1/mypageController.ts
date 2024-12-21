import express, { Request, Response } from 'express';
import { verifyToken } from '../../middlewares/authenticate';

export const mypageRouter = express.Router();

mypageRouter.get('/', verifyToken, async (req: Request, res: Response) => {
  const decoded = req.body.decoded;
  res.status(200).json({ username: decoded.username });
});
