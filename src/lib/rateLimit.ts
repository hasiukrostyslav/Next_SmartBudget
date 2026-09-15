import { headers } from 'next/headers';

import { db } from './db/db';

interface RateLimit {
  limit: number;
  windowSeconds: number;
}

// Sign-in limits count failed attempts only, so signing in successfully never
// uses anyone's allowance. Their keys pair the account with the client: a
// stranger's failures for your email use up the stranger's allowance, not
// yours. The per-account limit counts from every client, and is set high
// enough that only guessing from many addresses reaches it.
export const AUTH_RATE_LIMITS = {
  // Failed sign-ins for one account from one client.
  loginAccountClient: { limit: 10, windowSeconds: 15 * 60 },
  // Failed sign-ins from one client, whatever the account.
  loginClient: { limit: 30, windowSeconds: 15 * 60 },
  // Failed sign-ins for one account, whatever the client.
  loginAccount: { limit: 100, windowSeconds: 60 * 60 },
  // Sign-ups from one client: account creation is rare for a real person.
  signUpClient: { limit: 5, windowSeconds: 60 * 60 },
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

/** Whether `key` still has room, without counting an attempt. */
export async function isWithinRateLimit(key: string, { limit }: RateLimit) {
  try {
    const [row] = await db.$queryRaw<{ count: number }[]>`
      SELECT count FROM rate_limits
      WHERE key = ${key} AND reset_at > CURRENT_TIMESTAMP`;
    return (row?.count ?? 0) < limit;
  } catch (error) {
    console.error('[isWithinRateLimit]', error);
    return true;
  }
}

// How many proxies in front of the app append to X-Forwarded-For. Each one
// adds the address it received the request from, so the entry that many places
// from the right is the one the outermost trusted proxy saw; anything further
// left is whatever the client sent. The default, 1, fits Vercel (which sets
// the header to a single address) and a single reverse proxy. The old code took
// the first entry, which the client controls whenever a proxy appends.
function trustedProxyHops() {
  const hops = Number(process.env.TRUSTED_PROXY_HOPS ?? 1);
  return Number.isInteger(hops) && hops >= 1 && hops <= 10 ? hops : 1;
}

async function clientAddress() {
  const requestHeaders = await headers();
  const chain =
    requestHeaders
      .get('x-forwarded-for')
      ?.split(',')
      .map((entry) => entry.trim())
      .filter(Boolean) ?? [];

  return (
    chain[Math.max(chain.length - trustedProxyHops(), 0)] ||
    requestHeaders.get('x-real-ip') ||
    'unknown'
  );
}

async function loginKeys(email: string) {
  const account = email.toLowerCase();
  const client = await clientAddress();
  return {
    client: `login:client:${client}`,
    accountClient: `login:account-client:${account}:${client}`,
    account: `login:account:${account}`,
  };
}

// Checked before the password. Reads only: nothing is counted until an attempt
// fails. The client's own limit is read first, and a client over it touches
// nothing else.
export async function isLoginAllowed(email: string) {
  const keys = await loginKeys(email);
  if (!(await isWithinRateLimit(keys.client, AUTH_RATE_LIMITS.loginClient)))
    return false;

  const [withinAccountClient, withinAccount] = await Promise.all([
    isWithinRateLimit(keys.accountClient, AUTH_RATE_LIMITS.loginAccountClient),
    isWithinRateLimit(keys.account, AUTH_RATE_LIMITS.loginAccount),
  ]);
  return withinAccountClient && withinAccount;
}

export async function recordLoginFailure(email: string) {
  const keys = await loginKeys(email);
  await Promise.all([
    consumeRateLimit(keys.client, AUTH_RATE_LIMITS.loginClient),
    consumeRateLimit(keys.accountClient, AUTH_RATE_LIMITS.loginAccountClient),
    consumeRateLimit(keys.account, AUTH_RATE_LIMITS.loginAccount),
  ]);
}

// Every sign-up counts: creating accounts is what is being limited.
export async function isSignUpAllowed() {
  return consumeRateLimit(
    `signup:client:${await clientAddress()}`,
    AUTH_RATE_LIMITS.signUpClient,
  );
}
