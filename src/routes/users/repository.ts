import { Prisma } from '@prisma/client';
import prisma from '../../lib/prisma';

export class UserRepository {
  async findMany(where: Prisma.UserWhereInput) {
    return await prisma.user.findMany({
      where,
      include: { profile: true },
    });
  }
  async findByUserId(userId: number) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
    return user;
  }

  async findByPublicId(publicId: string) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        publicId: publicId,
      },
      include: {
        profile: true,
      },
    });
    return user;
  }

  async findByFirebaseUId(firebaseUid: string) {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        firebaseUid: firebaseUid,
      },
      include: {
        profile: true,
      },
    });
    return user;
  }

  async registerUser(
    userData: {
      email: string;
      username: string;
      firebaseUid: string;
      roleId: number;
    },
    userProfile: {
      iconUrl: string;
      displayName: string;
      isPublic: boolean;
    },
  ) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: userData });
      const profile = await tx.userProfile.create({
        data: {
          userId: user.id,
          ...userProfile,
        },
      });
      return { user, profile };
    });
  }
}

export const userRepository = new UserRepository();
