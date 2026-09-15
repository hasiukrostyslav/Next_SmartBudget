import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { env } from '../lib/env';
import authConfig from './auth.config';
import { createAccount, verifyCredentials } from './credentials';
import { revalidateSessionToken } from './session';

// Credentials sign-in with JWT sessions needs no database adapter. Adding an
// OAuth provider means adding the Auth.js adapter and the Session and
// VerificationToken models it expects first.
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: verifyCredentials,
    }),
    Credentials({
      id: 'signup',
      name: 'Sign up',
      credentials: {
        name: { label: 'Name' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: createAccount,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt: ({ token }) => revalidateSessionToken(token),
  },
});
