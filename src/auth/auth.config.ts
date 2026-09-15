import type { NextAuthConfig } from 'next-auth';

import { LOGIN_PATH } from '../routes';

// Edge-safe config shared by the proxy and the Node auth instance: nothing
// here may touch the database. Providers live in auth.ts; the proxy only reads
// sessions. The session callback lives here so the proxy's session carries
// user.id, which the proxy guard checks.
export default {
  session: {
    strategy: 'jwt',
    // A week instead of Auth.js's default 30 days. auth.ts also re-checks
    // that the account still exists.
    maxAge: 7 * 24 * 60 * 60,
  },
  // Auth.js's own unstyled sign-in page (/api/auth/signin) offered working
  // sign-in and sign-up forms; it now redirects to the app's login page.
  pages: { signIn: LOGIN_PATH },
  providers: [],
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
} satisfies NextAuthConfig;
