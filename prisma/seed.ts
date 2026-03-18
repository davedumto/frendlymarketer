import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const defaults = [
  { name: 'Executives — CEO & COO', order: 1 },
  { name: 'Strategy & Communications', order: 2 },
  { name: 'Creatives & Developers', order: 3 },
  { name: 'Operations & Support', order: 4 },
];

async function main() {
  for (const dept of defaults) {
    const result = await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    });
    console.log('Seeded:', result.name);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
