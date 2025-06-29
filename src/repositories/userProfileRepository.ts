import prisma from '../prisma';

export class UserProfileRepository {
  async findByUserId(userId: number) {
    return prisma.userProfile.findFirstOrThrow({
      where: { user_id: userId },
    });
  }

  async createUserProfile(data: {
    user_id: number;
    icon_url: string | null;
    display_name: string | null;
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
      icon_url: string;
      display_name: string;
      is_public: boolean;
    }>
  ) {
    return prisma.userProfile.update({
      where: { user_id: userId },
      data,
    });
  }
}
