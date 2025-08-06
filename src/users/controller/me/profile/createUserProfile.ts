import { Request, Response } from 'express';
import { userService } from '../../../service/userService';
import { HTTPException } from '../../../../error';
import { defineHandler } from '../../../../middlewares/handlers';
import { CreateUserProfileSchema } from '../../../schema/userSchema';
import { z } from 'zod';

export const createUserProfileHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded;
    const { icon_url: iconUrl, display_name: displayName } =
      req.validatedBody as z.infer<typeof CreateUserProfileSchema.body>;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = await userService.findByFirebaseUid(decoded!.firebaseUid);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const profile = await userService.createProfile({
      userId: user.id,
      iconUrl: iconUrl ?? null,
      displayName: displayName ?? null,
    });
    return res.status(200).json({ decoded, profile });
  },
);
