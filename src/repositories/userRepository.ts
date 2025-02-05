import prisma from '../prisma';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  async findByPublicId(publicId: string) {
    return prisma.user.findFirst({
      where: { public_id: publicId },
    });
  }

  async createUser(data: {
    password: string;
    username: string;
    email: string;
    display_name: string | null;
  }) {
    return prisma.user.create({
      data,
    });
  }

  async updateUser(
    id: number,
    data: Partial<{ username: string; display_name: string; password: string }>,
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateUserLastLogin(id: number) {
    return prisma.user.update({
      where: { id },
      data: { last_login: new Date() },
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
