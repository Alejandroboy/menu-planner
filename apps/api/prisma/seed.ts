import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const seedFile = path.join(__dirname, 'seed.sql');
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }

  console.log('🌱 Running seed.sql...');
  const psqlUrl = url.replace(/\?.*$/, '');
  execSync(`psql "${psqlUrl}" -f "${seedFile}"`, { stdio: 'inherit' });
  console.log('✅ Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
