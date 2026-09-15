import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaClient } from '../../../generated/client';
import { env } from '../env';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// TLS with certificate verification by default, and anything weaker than
// verify-full in the URL is upgraded to it. A URL that explicitly says
// sslmode=disable (a local database) connects without TLS instead of failing.
const sslDisabled = /[?&]sslmode=disable(&|$)/.test(env.DATABASE_URL);

const connectionString = sslDisabled
  ? env.DATABASE_URL
  : env.DATABASE_URL.replace(
      /sslmode=(prefer|require|verify-ca)/,
      'sslmode=verify-full',
    );

const pool = new Pool({
  connectionString,
  ssl: sslDisabled ? false : { rejectUnauthorized: true },
});

const adapter = new PrismaPg(pool);

export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
