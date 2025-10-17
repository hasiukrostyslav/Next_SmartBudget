'use server';

import z from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '../db/db';
import { SignInSchema, SignUpSchema } from '../schemas/schema';
import { saltRounds } from '../constants';
import { getUserByEmail } from '../db/user';
import { signInUser } from '@/auth/utils';

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

  // Sign In
  const result = await signInUser(email, password);
  if (!result.success) return result;
}

export async function login(formData: SignInFormData) {
  // Form data validation
  const validatedFields = SignInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password!',
    };
  }

  const { email, password } = validatedFields.data;

  // Sign In
  const result = await signInUser(email, password);
  if (!result.success) return result;
}
