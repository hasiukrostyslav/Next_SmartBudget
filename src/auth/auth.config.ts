import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
    }),
  ],
} satisfies NextAuthConfig;
