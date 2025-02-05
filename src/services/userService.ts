import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository = new UserRepository();

  async loginUser(email: string, rawPassword: string) {
    const user = await this.userRepository.findByEmail(email);
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
    rawPassword: string,
    username: string,
    email: string,
    displayName: string | null,
  ) {
    const soltRounds = 10;
    const hashedPassword = await bcrypt.hash(rawPassword, soltRounds);
    return this.userRepository.createUser({
      password: hashedPassword,
      email: email,
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
