import { Request, Response } from 'express';
import { UserService } from '../../services/userService';
import { HTTPException } from '../../error';
import { JWTBody } from '../../types';
import {
  CreateUserProfileSchema,
  DetailUserSchema,
  UpdateUserProfileSchema,
} from '../../schemas/userSchema';
import { z } from 'zod';
import { defineHandler } from '../../middlewares/handlers';

const userService = new UserService();

export const usersHandler = defineHandler(
  async (req: Request, res: Response) => {
    const users = await userService.findAll();
    res.status(200).json({
      list: users.map((it) => ({
        user_public_id: it.publicId,
        icon_url: it.profile?.iconUrl,
        display_name: it.profile?.displayName,
        is_public: it.profile?.isPublic,
        logins: it.profile?.isPublic
          ? it.logins.map((login) => login.loggedInAt)
          : [],
      })),
    });
  },
);

export const userDetailHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = req.validatedParams as z.infer<
      typeof DetailUserSchema.params
    >;
    const user = await userService.findByPublicId(publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    res.status(200).json({
      user_public_id: user.publicId,
      icon_url: user.profile?.iconUrl,
      display_name: user.profile?.displayName,
      is_public: user.profile?.isPublic,
      logins: user.profile?.isPublic
        ? user.logins.map((login) => login.loggedInAt)
        : [],
    } as z.infer<(typeof DetailUserSchema.responses)['200']['body']>);
  },
);

export const createUserProfileHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = req.validatedParams as z.infer<
      typeof CreateUserProfileSchema.params
    >;
    if (decoded.publicId !== publicId) {
      throw new HTTPException('Forbidden', {
        detailMessage: '許可されていません。',
      });
    }
    const { icon_url: iconUrl, display_name: displayName } =
      req.validatedBody as z.infer<typeof CreateUserProfileSchema.body>;
    const user = await userService.findByPublicId(decoded.publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const profile = await userService.createProfile({
      userId: user.id,
      iconUrl,
      displayName,
    });
    res.status(200).json({ decoded, profile });
  },
);

export const updateUserProfileHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = req.validatedParams as z.infer<
      typeof UpdateUserProfileSchema.params
    >;
    if (decoded.publicId !== publicId) {
      throw new HTTPException('Forbidden', {
        detailMessage: '許可されていません。',
      });
    }
    const {
      icon_url: iconUrl,
      display_name: displayName,
      is_public: isPublic,
    } = req.validatedBody as z.infer<typeof UpdateUserProfileSchema.body>;
    const user = await userService.findByPublicId(decoded.publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const profile = await userService.updateProfile(user.id, {
      iconUrl,
      displayName,
      isPublic,
    });
    res.status(200).json({ decoded, profile });
  },
);
