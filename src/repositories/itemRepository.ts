import prisma from '../prisma';

export class ItemRepository {
  async findByItemId(itemId: number) {
    return prisma.item.findFirst({
      where: { id: itemId },
    });
  }

  async findByPublicId(publicId: string) {
    return prisma.user.findFirst({
      where: { public_id: publicId },
    });
  }

  async createItem(data: {
    name: string;
    description: string | null;
    category_id: string;
    user_id: number;
  }) {
    return prisma.item.create({
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

  async deleteItem(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
