import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository = new UserRepository();

  async loginUser(loginId: string, rawPassword: string) {
    const user = await this.userRepository.findByLoginId(loginId);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(rawPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    await this.userRepository.updateUserLastLogin(user.id);
    return user;
  }

  async registerUser(
    loginId: string,
    rawPassword: string,
    username: string,
    displayName: string | null
  ) {
    const soltRounds = 10;
    const hashedPassword = await bcrypt.hash(rawPassword, soltRounds);
    return this.userRepository.createUser({
      login_id: loginId,
      password: hashedPassword,
      username: username,
      display_name: displayName,
    });
  }

  async updateUserPassword(userId: number, newPassword: string) {
    const soltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, soltRounds);
    return this.userRepository.updateUser(userId, { password: hashedPassword });
  }
}
