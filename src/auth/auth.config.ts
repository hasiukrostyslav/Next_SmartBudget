import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
} satisfies NextAuthConfig;
