import { Request, Response } from 'express';
import { userService } from '../service/userService';
import { ListUserSchema } from '../schema/userSchema';
import { defineHandler } from '../../middlewares/handlers';
import { toUserData } from '../dto/userDto';

export const listUsersHandler = defineHandler(
  async (req: Request, res: Response) => {
    const users = await userService.findAll();
    const responseData = {
      list: users.map(
        (user: {
          publicId: string;
          profile: {
            iconUrl: string | null;
            displayName: string | null;
            isPublic: boolean;
          } | null;
          logins: { loggedInAt: Date }[];
        }) => toUserData(user),
      ),
    };
    const validated = ListUserSchema.responses[200].body.parse(responseData);
    res.status(200).json(validated);
  },
);
