import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';

import { getUserByEmail } from '@/lib/db/users';
import { SignInSchema } from '@/lib/schemas/auth.schema';

import { db } from '../lib/db/db';
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    {
      ...authConfig.providers[0],
      async authorize(credentials) {
        // Credentials validation
        const validatedFields = SignInSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        // Get user
        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        // Compare passwords with user hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return null;

        return user;
      },
    },
  ],
  callbacks: {
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },

    async jwt({ token }) {
      return token;
    },
  },
});
