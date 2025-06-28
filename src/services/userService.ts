import config from '../config';
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository = new UserRepository();

  async loginUser(email: string, rawPassword: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(rawPassword, user.password);
    if (!isPasswordValid) {
      return null;
    }
    await this.userRepository.updateUserLastLogin(user.id);
    return user;
  }

  async registerUser(
    rawPassword: string,
    username: string,
    email: string,
    displayName: string | null,
  ) {
    const hashedPassword = await bcrypt.hash(
      rawPassword,
      config.passwordSaltRounds,
    );
    return this.userRepository.createUser({
      password: hashedPassword,
      email: email,
      username: username,
      display_name: displayName,
    });
  }

  async updateUserPassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(
      newPassword,
      config.passwordSaltRounds,
    );
    return this.userRepository.updateUser(userId, { password: hashedPassword });
  }
}
