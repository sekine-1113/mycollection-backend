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

  async findByFirebaseUid(firebaseUid: string) {
    return this.userRepository.findByFirebaseUid(firebaseUid);
  }

  async loginUser(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    if (user.deleted) {
      await this.userRepository.restoreUser(user.id);
    }
    await this.userRepository.loggedInUser(user.id);
    return user;
  }

  async registerUser(email: string, username: string, firebaseUid: string) {
    return await this.userRepository.createUser({
      email: email,
      username: username,
      firebaseUid,
      roleId: 1,
    });
  }

  async deleteUser(userId: number) {
    return await this.userRepository.deleteUser(userId);
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

export const userService = new UserService();
