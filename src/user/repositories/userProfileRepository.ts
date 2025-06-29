import prisma from '../../prisma';

export class UserProfileRepository {
  async findByUserId(userId: number) {
    return prisma.userProfile.findFirstOrThrow({
      where: { userId },
    });
  }

  async createUserProfile(data: {
    userId: number;
    iconUrl: string | null;
    displayName: string | null;
  }) {
    try {
      return await prisma.userProfile.create({
        data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async updateUserProfile(
    userId: number,
    data: Partial<{
      iconUrl: string;
      displayName: string;
      isPublic: boolean;
    }>,
  ) {
    return prisma.userProfile.update({
      where: { userId },
      data,
    });
  }
}
