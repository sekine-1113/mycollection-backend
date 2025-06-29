import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import config from '../config';
import { HTTPException } from '../error';
import { UserService } from './userService';
import { JWTBody } from '../types';

export class AuthService {
  private userService = new UserService();

  async login(email: string, password: string) {
    const user = await this.userService.loginUser(email, password);
    if (!user)
      throw new HTTPException('NotFound', {
        detailMessage: 'email または password に誤りがあります。',
      });
    const token = jwt.sign(
      { publicId: user.publicId } as JWTBody,
      config.jwt.secret as Secret,
      config.jwt.options as SignOptions,
    );
    return { token };
  }
}
