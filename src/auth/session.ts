import type { JWT } from 'next-auth/jwt';

import { getUserById } from '@/lib/db/users';

const RECHECK_SECONDS = 5 * 60;

// JWT sessions are not stored server-side, so deleting an account used to
// leave its session valid until the cookie expired. At most every five
// minutes the account is looked up again; returning null ends the session.
// This runs in the proxy (src/proxy.ts), whose response carries the updated or
// cleared cookie, as well as in auth.ts.
export async function revalidateSessionToken(
  token: JWT,
  now = Math.floor(Date.now() / 1000),
): Promise<JWT | null> {
  if (!token.sub) return token;

  const checkedAt =
    typeof token.accountCheckedAt === 'number' ? token.accountCheckedAt : 0;
  if (now - checkedAt < RECHECK_SECONDS) return token;

  let user;
  try {
    user = await getUserById(token.sub);
  } catch (error) {
    // A failed lookup says nothing about the account. Ending the session here
    // turned a database outage into "please sign in" for everyone, and cleared
    // their cookies. Keep the token; the check runs again next request.
    console.error('[revalidateSessionToken]', error);
    return token;
  }

  if (!user) return null;

  return { ...token, accountCheckedAt: now };
}
