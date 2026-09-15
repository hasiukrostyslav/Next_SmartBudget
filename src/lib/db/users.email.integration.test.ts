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
const john = `john-${run}@example.com`;
const sameLower = `twin-${run}@example.com`;
const sameUpper = `TWIN-${run}@example.com`;

describe.skipIf(!process.env.TEST_DATABASE_URL)('getUserByEmail', () => {
  afterAll(async () => {
    await db.user.deleteMany({
      where: { email: { in: [storedEmail, john, sameLower, sameUpper] } },
    });
    await db.$disconnect();
  });

  it('finds an account stored with capitals by its lowercased email', async () => {
    await db.user.create({ data: { email: storedEmail, name: 'Legacy' } });

    const found = await getUserByEmail(storedEmail.toLowerCase());
    expect(found?.email).toBe(storedEmail);
  });

  it('treats _ and % in an address literally', async () => {
    await db.user.create({ data: { email: john, name: 'John' } });

    expect(await getUserByEmail(john)).not.toBeNull();
    expect(await getUserByEmail(john.replace('john', 'j_hn'))).toBeNull();
    expect(await getUserByEmail(john.replace('john', 'j%'))).toBeNull();
  });

  it('prefers the exact-case row when two rows differ only by case', async () => {
    await db.user.create({ data: { email: sameLower, name: 'Lower' } });
    await db.user.create({ data: { email: sameUpper, name: 'Upper' } });

    expect((await getUserByEmail(sameUpper))?.name).toBe('Upper');
    expect((await getUserByEmail(sameLower))?.name).toBe('Lower');
  });
});
