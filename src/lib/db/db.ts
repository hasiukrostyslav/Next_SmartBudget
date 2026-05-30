import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaClient } from '../../../generated/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL?.replace(
  /sslmode=(prefer|require|verify-ca)/,
  'sslmode=verify-full',
);

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: true },
});

const adapter = new PrismaPg(pool);

export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
