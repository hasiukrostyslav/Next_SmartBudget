import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { env } from '../lib/env';
import authConfig from './auth.config';
import { createAccount, verifyCredentials } from './credentials';
import { revalidateSessionToken } from './session';

// Credentials sign-in with JWT sessions needs no database adapter. The Prisma
// adapter that used to be wired here called prisma.user / prisma.account,
// while the generated client has prisma.users / prisma.accounts; it only never
// failed because this setup never calls it. Adding an OAuth provider means
// adding the Auth.js models under the names the adapter expects first.
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
