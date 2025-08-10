import { Prisma } from '@prisma/client';
import { userRepository } from './repository';

export class UserService {
  private userRepository = userRepository;

  async findMany(where: Prisma.UserWhereInput) {
    return await this.userRepository.findMany(where);
  }

  async findByPublicId(publicId: string) {
    return await this.userRepository.findByPublicId(publicId);
  }

  async registerUser(
    email: string,
    username: string,
    firebaseUid: string,
    roleId: number,
    iconUrl: string,
    displayName: string,
    isPublic: boolean,
  ) {
    return await this.userRepository.registerUser(
      {
        email,
        username,
        firebaseUid,
        roleId,
      },
      {
        iconUrl,
        displayName,
        isPublic,
      },
    );
  }
}

export const userService = new UserService();
