import { prisma } from '../src/config/prisma.js';

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      name: 'Administrador Base',
      password: 'password123', // En Hito 4 aplicaremos hashing
      role: 'ADMIN',
    },
  });

  console.log('Seed exitoso:', { admin });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
