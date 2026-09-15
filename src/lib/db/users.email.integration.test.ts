// Against a real PostgreSQL; skipped unless TEST_DATABASE_URL is set.
import { afterAll, describe, expect, it, vi } from 'vitest';

vi.mock('./db', async () => {
  const { PrismaClient } = await import('../../../generated/client');
  const { PrismaPg } = await import('@prisma/adapter-pg');
  return {
    db: new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.TEST_DATABASE_URL,
      }),
    }),
  };
});

const { db } = await import('./db');
const { getUserByEmail } = await import('./users');

const run = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const storedEmail = `Mixed.Case-${run}@Example.COM`;

describe.skipIf(!process.env.TEST_DATABASE_URL)('getUserByEmail', () => {
  afterAll(async () => {
    await db.user.deleteMany({ where: { email: storedEmail } });
    await db.$disconnect();
  });

  it('finds an account stored with capitals by its lowercased email', async () => {
    await db.user.create({ data: { email: storedEmail, name: 'Legacy' } });

    const found = await getUserByEmail(storedEmail.toLowerCase());
    expect(found?.email).toBe(storedEmail);
  });
});
