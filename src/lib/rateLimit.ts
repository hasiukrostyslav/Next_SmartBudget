import { headers } from 'next/headers';

import { db } from './db/db';

interface RateLimit {
  limit: number;
  windowSeconds: number;
}

export const AUTH_RATE_LIMITS = {
  // Per account being signed into: slows guessing one account's password.
  loginEmail: { limit: 10, windowSeconds: 15 * 60 },
  // Per client: slows trying many accounts from one place.
  loginIp: { limit: 30, windowSeconds: 15 * 60 },
  // Per client: account creation is rare for a real person.
  signUpIp: { limit: 5, windowSeconds: 60 * 60 },
} satisfies Record<string, RateLimit>;

/**
 * Counts one attempt against `key` and returns whether it is within the limit.
 *
 * Fixed window, stored in PostgreSQL so the count holds across server
 * instances and deploys; an in-memory counter would reset with each. The
 * upsert is a single statement, so concurrent attempts cannot both read the
 * same stale count.
 */
export async function consumeRateLimit(
  key: string,
  { limit, windowSeconds }: RateLimit,
) {
  try {
    const [row] = await db.$queryRaw<{ count: number }[]>`
      INSERT INTO rate_limits (key, count, reset_at)
      VALUES (${key}, 1, CURRENT_TIMESTAMP + make_interval(secs => ${windowSeconds}))
      ON CONFLICT (key) DO UPDATE SET
        count = CASE
          WHEN rate_limits.reset_at <= CURRENT_TIMESTAMP THEN 1
          ELSE rate_limits.count + 1
        END,
        reset_at = CASE
          WHEN rate_limits.reset_at <= CURRENT_TIMESTAMP THEN EXCLUDED.reset_at
          ELSE rate_limits.reset_at
        END
      RETURNING count`;

    // Expired windows are dead rows; sweep them now and then rather than on
    // every attempt.
    if (Math.random() < 0.01) {
      db.$executeRaw`DELETE FROM rate_limits WHERE reset_at < CURRENT_TIMESTAMP`.catch(
        (error: unknown) => console.error('[consumeRateLimit] sweep', error),
      );
    }

    return row.count <= limit;
  } catch (error) {
    // Fail open: a limiter failure — or a database that doesn't have this
    // table yet — must not lock every user out of their account.
    console.error('[consumeRateLimit]', error);
    return true;
  }
}

// The client address. x-forwarded-for is set by the hosting proxy (Vercel and
// most load balancers) and its first entry is the original client. Without a
// proxy it can be forged, which only moves the caller to a different per-client
// bucket: the per-account limit still applies.
async function clientAddress() {
  const requestHeaders = await headers();
  return (
    requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    requestHeaders.get('x-real-ip') ||
    'unknown'
  );
}

export async function isLoginAllowed(email: string) {
  const address = await clientAddress();
  const [withinAccountLimit, withinClientLimit] = await Promise.all([
    consumeRateLimit(
      `login:email:${email.toLowerCase()}`,
      AUTH_RATE_LIMITS.loginEmail,
    ),
    consumeRateLimit(`login:ip:${address}`, AUTH_RATE_LIMITS.loginIp),
  ]);
  return withinAccountLimit && withinClientLimit;
}

export async function isSignUpAllowed() {
  return consumeRateLimit(
    `signup:ip:${await clientAddress()}`,
    AUTH_RATE_LIMITS.signUpIp,
  );
}
