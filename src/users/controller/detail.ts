import { Request, Response } from 'express';
import { userService } from '../service/userService';
import { HTTPException } from '../../error';
import { DetailUserSchema } from '../schema/userSchema';
import { defineHandler } from '../../middlewares/handlers';
import { toUserData } from '../dto/userDto';
import { z } from 'zod';

export const userDetailHandler = defineHandler(
  async (req: Request, res: Response) => {
    const decoded = req.decoded;
    const { publicId } = req.validatedParams as z.infer<
      typeof DetailUserSchema.params
    >;
    const user = await userService.findByPublicId(publicId);
    if (!user) {
      throw new HTTPException('NotFound');
    }
    const userData = toUserData(user);
    const validated = DetailUserSchema.responses[200].body.parse(userData);
    res.status(200).json(validated);
  },
);
