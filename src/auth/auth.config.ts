import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Edge-safe config shared by the proxy and the Node auth instance. Anything
// here must not touch the database. The session callback lives here, not in
// auth.ts, so the proxy's session carries `user.id` too — the proxy guard
// checks for that id rather than for the mere presence of `req.auth`.
export default {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
} satisfies NextAuthConfig;
