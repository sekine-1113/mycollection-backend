import config from '../../config';
import { UserProfileRepository } from '../repositories/userProfileRepository';
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository = new UserRepository();
  private userProfileRepository = new UserProfileRepository();

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findByPublicId(publicId: string) {
    return await this.userRepository.findByPublicId(publicId);
  }

  async loginUser(email: string, rawPassword: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(rawPassword, user.password);
    if (!isPasswordValid) {
      return null;
    }

    if (user.deleted) {
      await this.userRepository.restoreUser(user.id);
    }
    await this.userRepository.loggedInUser(user.id);
    return user;
  }

  async registerUser(email: string, rawPassword: string, username: string) {
    const hashedPassword = await bcrypt.hash(
      rawPassword,
      config.PASSWORD_SALT_ROUNDS,
    );
    return await this.userRepository.createUser({
      email: email,
      password: hashedPassword,
      username: username,
    });
  }

  async deleteUser(userId: number) {
    return await this.userRepository.deleteUser(userId);
  }

  async updateUserPassword(userId: number, newPassword: string) {
    const hashedPassword = await bcrypt.hash(
      newPassword,
      config.PASSWORD_SALT_ROUNDS,
    );
    return await this.userRepository.updateUser(userId, {
      password: hashedPassword,
    });
  }

  async createProfile(data: {
    userId: number;
    iconUrl: string | null;
    displayName: string | null;
  }) {
    return await this.userProfileRepository.createUserProfile(data);
  }

  async updateProfile(
    userId: number,
    data: Partial<{
      iconUrl: string;
      displayName: string;
      isPublic: boolean;
    }>,
  ) {
    return await this.userProfileRepository.updateUserProfile(userId, data);
  }
}
