import prisma from '../prisma';

export class UserRepository {
  async findAll() {
    return prisma.user.findMany({
      include: {
        profile: true,
        logins: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
      include: {
        profile: true,
        logins: true,
      },
    });
  }

  async findByPublicId(publicId: string) {
    return prisma.user.findFirst({
      where: { public_id: publicId },
      include: {
        profile: true,
        logins: true,
      },
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    username: string;
  }) {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async updateUser(
    id: number,
    data: Partial<{ username: string; password: string }>,
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async loggedInUser(userId: number) {
    return await prisma.userLoginLog.create({
      data: {
        user_id: userId,
      },
    });
  }

  async deleteUser(userId: number) {
    return await prisma.deletedUser.create({
      data: {
        user_id: userId,
      },
    });
  }
}
