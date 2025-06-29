import { Request, Response } from 'express';
import { UserService } from '../service/userService';
import { HTTPException } from '../../error';
import { JWTBody } from '../../types';
import {
  CreateUserProfileSchema,
  DetailUserSchema,
  ListUserSchema,
  UpdateUserProfileSchema,
} from '../schema/userSchema';
import { defineHandler } from '../../middlewares/handlers';
import { toUserData } from '../dto/userDto';

const userService = new UserService();

export const usersHandler = defineHandler(
  async (req: Request, res: Response) => {
    const users = await userService.findAll();
    const responseData = {
      list: users.map((user) => toUserData(user)),
    };
    const validated = ListUserSchema.responses[200].body.parse(responseData);
    res.status(200).json(validated);
  },
);

export const userDetailHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = DetailUserSchema.params.parse(req.validatedParams);
    const user = await userService.findByPublicId(publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const responseData = toUserData(user);
    const validated = DetailUserSchema.responses[200].body.parse(responseData);
    res.status(200).json(validated);
  },
);

export const createUserProfileHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = CreateUserProfileSchema.params.parse(
      req.validatedParams,
    );
    if (decoded.publicId !== publicId) {
      throw new HTTPException('Forbidden', {
        detailMessage: '許可されていません。',
      });
    }
    const { icon_url: iconUrl, display_name: displayName } =
      CreateUserProfileSchema.body.parse(req.validatedBody);
    const user = await userService.findByPublicId(decoded.publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const profile = await userService.createProfile({
      userId: user.id,
      iconUrl: iconUrl ?? null,
      displayName: displayName ?? null,
    });
    res.status(200).json({ decoded, profile });
  },
);

export const updateUserProfileHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded as JWTBody;
    const { publicId } = UpdateUserProfileSchema.params.parse(
      req.validatedParams,
    );
    if (decoded.publicId !== publicId) {
      throw new HTTPException('Forbidden', {
        detailMessage: '許可されていません。',
      });
    }
    const {
      icon_url: iconUrl,
      display_name: displayName,
      is_public: isPublic,
    } = UpdateUserProfileSchema.body.parse(req.validatedBody);
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
