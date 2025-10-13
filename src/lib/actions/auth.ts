'use server';

import z from 'zod';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { db } from '../db/db';
import { SignInSchema, SignUpSchema } from '../schemas/schema';
import { saltRounds } from '../constants';
import { getUserByEmail } from '../db/user';
import { signIn } from '@/auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { error } from 'console';

type SignUpFormData = z.infer<typeof SignUpSchema>;
type SignInFormData = z.infer<typeof SignInSchema>;

export async function signUp(formData: SignUpFormData) {
  // Form data validation
  const validatedFields = SignUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { email, password, name } = validatedFields.data;

  // Checking if account with provided email exist
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return {
      errors: { email: ['An account with this email already exists.'] },
    };

  // Hash password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create new user
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Set cookie for Toast component
  const cookieStore = cookies();
  (await cookieStore).set({
    name: 'signup_success',
    value: '1',
    maxAge: 1,
  });

  // redirect('/dashboard');
}

export async function login(formData: SignInFormData) {
  const validatedFields = SignInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: z.treeifyError(validatedFields.error).properties,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credential!' };
        default:
          return { error: 'Something went wrong' };
      }
    }
  }

  throw error;
}
