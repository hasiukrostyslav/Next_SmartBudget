import { AuthError } from 'next-auth';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { ERROR_MESSAGES } from '@/lib/constants/messages';

import { signIn } from './auth';

export async function signInUser(email: string, password: string) {
  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: true, data: res };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return {
          success: false,
          error: ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD,
        };
      }
      return { success: false, error: ERROR_MESSAGES.SOMETHING_WENT_WRONG };
    }
    throw error;
  }
}
