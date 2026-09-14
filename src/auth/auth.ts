import NextAuth from 'next-auth';

import authConfig from './auth.config';
import { verifyCredentials } from './credentials';

// Credentials sign-in with JWT sessions needs no database adapter. The Prisma
// adapter that used to be wired here called prisma.user / prisma.account,
// while the generated client has prisma.users / prisma.accounts; it only never
// failed because this setup never calls it. Adding an OAuth provider means
// adding the Auth.js models under the names the adapter expects first.
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    {
      ...authConfig.providers[0],
      authorize: verifyCredentials,
    },
  ],
});
