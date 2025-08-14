import prisma from './lib/prisma';

async function main() {
  await prisma.user.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.userProfile.deleteMany();

  const adminRole = await prisma.userRole.create({
    data: {
      name: 'admin',
    },
  });
  const alice = await prisma.user.create({
    data: {
      email: 'test@example.com',
      username: 'alice',
      firebaseUid: 'dummy',
      roleId: adminRole.id,
      profile: {
        create: {
          displayName: 'alice',
          iconUrl: '',
          isPublic: true,
        },
      },
    },
  });

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
