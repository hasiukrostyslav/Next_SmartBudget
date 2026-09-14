import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '../lib/db/db';
import authConfig from './auth.config';
import { verifyCredentials } from './credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    {
      ...authConfig.providers[0],
      authorize: verifyCredentials,
    },
  ],
});
