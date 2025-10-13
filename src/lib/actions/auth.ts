'use server';

import z from 'zod';
import bcrypt from 'bcryptjs';
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
      error: 'Invalid credentials',
    };
  }

  const { email, password, name } = validatedFields.data;

  // Checking if account with provided email exist
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return {
      error: 'An account with this email already exists.',
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
}

export async function login(formData: SignInFormData) {
  const validatedFields = SignInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password!',
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
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid email or password!' };
      }
      return { error: 'Something went wrong' };
    }
  }

  throw error;
}
