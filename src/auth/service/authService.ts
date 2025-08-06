import jwt from 'jsonwebtoken';
import config from '../../config';
import { HTTPException } from '../../error';
import { userService, UserService } from '../../users/service/userService';
import { UserRole } from '@prisma/client';

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async login(email: string) {
    const user = await this.userService.loginUser(email);
    if (!user)
      throw new HTTPException('NotFound', {
        detailMessage: 'email または password に誤りがあります。',
      });
    const token = '';

    return { token };
  }
}

export const authService = new AuthService(userService);
