// Against a real PostgreSQL with the migrations applied; skipped unless
// TEST_DATABASE_URL is set.
import { afterAll, describe, expect, it, vi } from 'vitest';

const run = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

vi.mock('./db/db', async () => {
  const { PrismaClient } = await import('../../generated/client');
  const { PrismaPg } = await import('@prisma/adapter-pg');
  return {
    db: new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.TEST_DATABASE_URL,
      }),
    }),
  };
});

vi.mock('next/headers', () => ({
  headers: async () => new Headers({ 'x-forwarded-for': `test-${run}, proxy` }),
}));

const { db } = await import('./db/db');
const { AUTH_RATE_LIMITS, consumeRateLimit, isLoginAllowed } =
  await import('./rateLimit');

describe.skipIf(!process.env.TEST_DATABASE_URL)('rate limiting', () => {
  afterAll(async () => {
    await db.$executeRaw`DELETE FROM rate_limits WHERE key LIKE ${`%${run}%`}`;
    await db.$disconnect();
  });

  it('allows attempts up to the limit, then blocks', async () => {
    const key = `test:${run}:limit`;
    const results: boolean[] = [];
    for (let i = 0; i < 4; i++) {
      results.push(
        await consumeRateLimit(key, { limit: 3, windowSeconds: 60 }),
      );
    }
    expect(results).toEqual([true, true, true, false]);
  });

  it('starts a new window once the old one has expired', async () => {
    const key = `test:${run}:window`;
    const limit = { limit: 1, windowSeconds: 60 };

    expect(await consumeRateLimit(key, limit)).toBe(true);
    expect(await consumeRateLimit(key, limit)).toBe(false);

    await db.$executeRaw`
      UPDATE rate_limits SET reset_at = CURRENT_TIMESTAMP - interval '1 second'
      WHERE key = ${key}`;

    expect(await consumeRateLimit(key, limit)).toBe(true);
  });

  it('limits sign-in per account regardless of email case', async () => {
    const email = `Someone-${run}@Example.com`;
    const { limit } = AUTH_RATE_LIMITS.loginEmail;
    const results: boolean[] = [];

    for (let i = 0; i <= limit; i++) {
      results.push(await isLoginAllowed(i % 2 ? email : email.toLowerCase()));
    }

    expect(results.slice(0, limit).every(Boolean)).toBe(true);
    expect(results[limit]).toBe(false);
  });
});
