// Against a real PostgreSQL; skipped unless TEST_DATABASE_URL is set.
import { afterAll, describe, expect, it, vi } from 'vitest';

import { isUniqueConstraintError } from './errors';

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
const { createUser, getUserByEmail } = await import('./users');

const email = `users-${Date.now()}-${Math.random().toString(36).slice(2)}@test.local`;

describe.skipIf(!process.env.TEST_DATABASE_URL)('users data layer', () => {
  afterAll(async () => {
    await db.user.deleteMany({ where: { email } });
    await db.$disconnect();
  });

  it('returns null for an email with no account', async () => {
    await expect(getUserByEmail(email)).resolves.toBeNull();
  });

  it('rejects a second account for the same email with a P2002 error', async () => {
    await createUser('First', email, 'hash');

    const duplicate = await createUser('Second', email, 'hash').catch(
      (error: unknown) => error,
    );
    expect(isUniqueConstraintError(duplicate)).toBe(true);
  });
});
