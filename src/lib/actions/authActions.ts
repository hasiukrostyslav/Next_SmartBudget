'use server';

import z from 'zod';

import { signInWithCredentials } from '@/auth/utils';

import { ERROR_MESSAGES } from '../constants/messages';
import { SignInSchema, SignUpSchema } from '../schemas/auth.schema';
import { safeCallbackPath } from '../utils/callbackUrl';

type SignUpFormData = z.infer<typeof SignUpSchema>;
type SignInFormData = z.infer<typeof SignInSchema>;

// Rate limits live in the providers' authorize() (auth/credentials.ts), not
// here: the Auth.js route reaches the providers without running these actions.

export async function signUp(formData: SignUpFormData) {
  const validatedFields = SignUpSchema.safeParse(formData);
  if (!validatedFields.success)
    return { error: ERROR_MESSAGES.auth.INVALID_CREDENTIALS };

  const { email, password, name } = validatedFields.data;

  // The 'signup' provider checks the limit, hashes the password once, creates
  // the account and signs it in. An email that already has an account is
  // refused by the unique index. There is no lookup before that any more: run
  // ahead of the limit, it answered "does this email have an account?" for
  // free.
  const result = await signInWithCredentials(
    'signup',
    { name, email, password },
    ERROR_MESSAGES.auth.EMAIL_EXISTS,
  );
  if (!result.success) return { error: result.error };
}

// callbackUrl is checked again here: the login page checks it, but a Server
// Action can be called directly with any argument.
export async function login(formData: SignInFormData, callbackUrl?: unknown) {
  const validatedFields = SignInSchema.safeParse(formData);
  if (!validatedFields.success)
    return { error: ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD };

  const { email, password } = validatedFields.data;

  const result = await signInWithCredentials(
    'credentials',
    { email, password },
    ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD,
    safeCallbackPath(typeof callbackUrl === 'string' ? callbackUrl : undefined),
  );
  if (!result.success) return { error: result.error };
}
