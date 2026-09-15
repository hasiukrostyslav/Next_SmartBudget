// Against a real PostgreSQL with the migrations applied; skipped unless
// TEST_DATABASE_URL is set.
import { afterAll, describe, expect, it, vi } from 'vitest';

const run = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const request = vi.hoisted(() => ({ client: 'unset' }));

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

// The client sends its own X-Forwarded-For; the proxy in front appends the
// address it saw. With TRUSTED_PROXY_HOPS unset (1), the rightmost counts.
vi.mock('next/headers', () => ({
  headers: async () =>
    new Headers({ 'x-forwarded-for': `forged-by-client, ${request.client}` }),
}));

const { db } = await import('./db/db');
const {
  AUTH_RATE_LIMITS,
  consumeRateLimit,
  isLoginAllowed,
  recordLoginFailure,
} = await import('./rateLimit');

const keysLike = async (fragment: string) =>
  (
    await db.$queryRaw<{ key: string }[]>`
      SELECT key FROM rate_limits WHERE key LIKE ${`%${fragment}%`}`
  ).map((row) => row.key);

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

  it('checking the limit counts nothing', async () => {
    request.client = `checker-${run}`;
    const email = `checked-${run}@example.com`;

    for (let i = 0; i < 15; i++) expect(await isLoginAllowed(email)).toBe(true);
    expect(await keysLike(`checked-${run}`)).toEqual([]);
  });

  it("blocks one client after repeated failures, regardless of email case, but not the account's other clients", async () => {
    const email = `Someone-${run}@Example.com`;
    const { limit } = AUTH_RATE_LIMITS.loginAccountClient;

    request.client = `attacker-${run}`;
    for (let i = 0; i < limit; i++) {
      await recordLoginFailure(i % 2 ? email : email.toLowerCase());
    }
    expect(await isLoginAllowed(email)).toBe(false);

    request.client = `owner-${run}`;
    expect(await isLoginAllowed(email)).toBe(true);
  });

  it('keys the client on the address the proxy appended, not the one the client sent', async () => {
    request.client = `appended-${run}`;
    await recordLoginFailure(`keyed-${run}@example.com`);

    const keys = await keysLike(`keyed-${run}`);
    expect(keys).toContain(
      `login:account-client:keyed-${run}@example.com:appended-${run}`,
    );
    expect(keys.some((key) => key.includes('forged-by-client'))).toBe(false);
  });
});
