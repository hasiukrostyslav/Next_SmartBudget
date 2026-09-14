'use server';

import bcrypt from 'bcryptjs';
import z from 'zod';

import { signInUser } from '@/auth/utils';

import { SALT_ROUNDS } from '../constants/constants';
import { ERROR_MESSAGES } from '../constants/messages';
import { isUniqueConstraintError } from '../db/errors';
import { createUser, getUserByEmail } from '../db/users';
import { SignInSchema, SignUpSchema } from '../schemas/auth.schema';

type SignUpFormData = z.infer<typeof SignUpSchema>;
type SignInFormData = z.infer<typeof SignInSchema>;

export async function signUp(formData: SignUpFormData) {
  // Form data validation
  const validatedFields = SignUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: ERROR_MESSAGES.auth.INVALID_CREDENTIALS,
    };
  }

  const { email, password, name } = validatedFields.data;

  try {
    // Checking if account with provided email exist
    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return {
        error: ERROR_MESSAGES.auth.EMAIL_EXISTS,
      };

    // Hash password and create the user. Sign-in only happens once the row
    // is known to exist.
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await createUser(name, email, hashedPassword);
  } catch (error) {
    // Two sign-ups for the same email can both pass the check above; the
    // unique index on users.email decides which one wins.
    if (isUniqueConstraintError(error))
      return { error: ERROR_MESSAGES.auth.EMAIL_EXISTS };

    console.error('[signUp]', error);
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG };
  }

  // Sign In
  const result = await signInUser(email, password);
  if (!result.success) return result;
}

export async function login(formData: SignInFormData) {
  // Form data validation
  const validatedFields = SignInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD,
    };
  }

  const { email, password } = validatedFields.data;

  // Sign In
  const result = await signInUser(email, password);
  if (!result.success) return result;
}
