import express, { Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { HTTPException } from '../../error';
import { verifyToken } from '../../middlewares/authenticate';
import { JWTBody } from '../../types';
import { validateRequest } from '../../middlewares/validate';
import {
  CreateUserProfileSchema,
  DetailUserSchema,
  UpdateUserProfileSchema,
} from '../../schemas/userSchema';
import { z } from 'zod';
import { defineHandler } from '../../middlewares/handlers';

export const userRouter = express.Router();
const userService = new UserService();

userRouter.get(
  '/',
  verifyToken,
  defineHandler(async (req: Request, res: Response) => {
    const users = await userService.findAll();
    res.status(200).json({
      list: users.map((it) => ({
        user_public_id: it.public_id,
        icon_url: it.profile?.icon_url,
        display_name: it.profile?.display_name,
        is_public: it.profile?.is_public,
        logins: it.profile?.is_public
          ? it.logins.map((login) => login.logged_in_at)
          : [],
      })),
    });
  })
);

userRouter.get(
  '/:publicId',
  verifyToken,
  validateRequest(DetailUserSchema),
  defineHandler(async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = req.validatedParams as z.infer<
      typeof DetailUserSchema.params
    >;
    const user = await userService.findByPublicId(publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    res.status(200).json({
      user_public_id: user.public_id,
      icon_url: user.profile?.icon_url,
      display_name: user.profile?.display_name,
      is_public: user.profile?.is_public,
      logins: user.profile?.is_public
        ? user.logins.map((login) => login.logged_in_at)
        : [],
    });
  })
);

userRouter.post(
  '/:publicId',
  verifyToken,
  validateRequest(CreateUserProfileSchema),
  defineHandler(async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = req.validatedParams as z.infer<
      typeof CreateUserProfileSchema.params
    >;
    if (decoded.publicId !== publicId) {
      throw new HTTPException('Forbidden', {
        detailMessage: '許可されていません。',
      });
    }
    const { icon_url, display_name } = req.validatedBody as z.infer<
      typeof CreateUserProfileSchema.body
    >;
    const user = await userService.findByPublicId(decoded.publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const profile = await userService.createProfile({
      user_id: user.id,
      icon_url,
      display_name,
    });
    res.status(200).json({ decoded, profile });
  })
);

userRouter.put(
  '/:publicId',
  verifyToken,
  validateRequest(UpdateUserProfileSchema),
  defineHandler(async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = req.validatedParams as z.infer<
      typeof UpdateUserProfileSchema.params
    >;
    if (decoded.publicId !== publicId) {
      throw new HTTPException('Forbidden', {
        detailMessage: '許可されていません。',
      });
    }
    const { icon_url, display_name, is_public } = req.validatedBody as z.infer<
      typeof UpdateUserProfileSchema.body
    >;
    const user = await userService.findByPublicId(decoded.publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const profile = await userService.updateProfile(user.id, {
      icon_url,
      display_name,
      is_public,
    });
    res.status(200).json({ decoded, profile });
  })
);
