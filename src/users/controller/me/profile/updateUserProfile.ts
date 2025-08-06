import { Request, Response } from 'express';
import { userService } from '../../../service/userService';
import { HTTPException } from '../../../../error';
import { defineHandler } from '../../../../middlewares/handlers';
import { UpdateUserProfileSchema } from '../../../schema/userSchema';
import { z } from 'zod';

export const updateUserProfileHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded;
    const {
      icon_url: iconUrl,
      display_name: displayName,
      is_public: isPublic,
    } = req.validatedBody as z.infer<typeof UpdateUserProfileSchema.body>;
    const user = { id: 1234 }; // await userService.findByPublicId(decoded.publicId);
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
