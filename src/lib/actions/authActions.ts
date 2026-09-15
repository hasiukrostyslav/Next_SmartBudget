'use server';

import z from 'zod';

import { signInWithCredentials } from '@/auth/utils';

import { ERROR_MESSAGES } from '../constants/messages';
import { getUserByEmail } from '../db/users';
import { isLoginAllowed, isSignUpAllowed } from '../rateLimit';
import { SignInSchema, SignUpSchema } from '../schemas/auth.schema';

type SignUpFormData = z.infer<typeof SignUpSchema>;
type SignInFormData = z.infer<typeof SignInSchema>;

export async function signUp(formData: SignUpFormData) {
  const validatedFields = SignUpSchema.safeParse(formData);
  if (!validatedFields.success)
    return { error: ERROR_MESSAGES.auth.INVALID_CREDENTIALS };

  // Checked before any lookup or hashing, so a flood of sign-ups can't spend
  // bcrypt time.
  if (!(await isSignUpAllowed()))
    return { error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS };

  const { email, password, name } = validatedFields.data;

  try {
    if (await getUserByEmail(email))
      return { error: ERROR_MESSAGES.auth.EMAIL_EXISTS };
  } catch (error) {
    console.error('[signUp]', error);
    return { error: ERROR_MESSAGES.SOMETHING_WENT_WRONG };
  }

  // The 'signup' provider hashes the password once, creates the account and
  // signs it in. It rejects only when another sign-up took the email between
  // the check above and the INSERT.
  const result = await signInWithCredentials(
    'signup',
    { name, email, password },
    ERROR_MESSAGES.auth.EMAIL_EXISTS,
  );
  if (!result.success) return { error: result.error };
}

export async function login(formData: SignInFormData) {
  const validatedFields = SignInSchema.safeParse(formData);
  if (!validatedFields.success)
    return { error: ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD };

  const { email, password } = validatedFields.data;

  // Counted before the password is checked, so every guess costs an attempt.
  if (!(await isLoginAllowed(email)))
    return { error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS };

  const result = await signInWithCredentials(
    'credentials',
    { email, password },
    ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD,
  );
  if (!result.success) return { error: result.error };
}
