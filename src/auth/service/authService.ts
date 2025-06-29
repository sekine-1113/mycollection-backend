import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../../config';
import { HTTPException } from '../../error';
import { UserService } from '../../users/service/userService';
import { JWTBody } from '../../types';
import { UserPermission } from '@prisma/client';

const ACCESS_SECRET = config.ACCESS_SECRET;
const REFRESH_SECRET = config.REFRESH_SECRET;

export class AuthService {
  private userService = new UserService();

  async login(email: string, password: string) {
    const user = await this.userService.loginUser(email, password);
    if (!user)
      throw new HTTPException('NotFound', {
        detailMessage: 'email または password に誤りがあります。',
      });
    const token = this.generateAccessToken(user.publicId, user.permission);

    return { token };
  }

  generateAccessToken(publicId: string, permission: UserPermission) {
    return jwt.sign({ publicId, permission }, ACCESS_SECRET, {
      expiresIn: '15m',
      algorithm: 'HS256',
    });
  }

  generateRefreshToken(publicId: string, permission: UserPermission) {
    return jwt.sign({ publicId, permission }, REFRESH_SECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });
  }

  verifyRefreshToken(token: string): string {
    try {
      const payload = jwt.verify(token, REFRESH_SECRET) as JWTBody;
      return payload.publicId;
    } catch (err) {
      throw new HTTPException('Unauthorized', {
        detailMessage: 'リフレッシュトークンが無効です。',
      });
    }
  }
}
