import prisma from '../../lib/prisma';

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
      where: {
        email,
      },
      include: {
        profile: true,
        logins: true,
        deleted: true,
      },
    });
  }

  async findByPublicId(publicId: string) {
    return prisma.user.findFirst({
      where: { publicId },
      include: {
        profile: true,
        logins: true,
      },
    });
  }

  async findByFirebaseUid(firebaseUid: string) {
    return prisma.user.findFirst({
      where: { firebaseUid },
      include: {
        profile: true,
        logins: true,
      },
    });
  }

  async createUser(data: {
    email: string;
    username: string;
    firebaseUid: string;
    roleId: number;
  }) {
    try {
      return await prisma.user.create({ data });
    } catch (err) {
      console.error(err);
    }
  }

  async updateUser(firebaseUid: string, data: Partial<{ username: string }>) {
    return prisma.user.update({
      where: { firebaseUid },
      data,
    });
  }

  async loggedInUser(userId: number) {
    return await prisma.userLoginLog.create({
      data: {
        userId,
      },
    });
  }

  async deleteUser(userId: number) {
    return await prisma.deletedUser.create({
      data: {
        userId,
      },
    });
  }

  async restoreUser(userId: number) {
    await prisma.deletedUser.delete({
      where: {
        userId,
      },
    });
  }

  async signedInLogs(userId: number) {
    await prisma.userLoginLog.findMany({
      where: {
        id: userId,
      },
      orderBy: {
        loggedInAt: 'desc',
      },
    });
  }
}
