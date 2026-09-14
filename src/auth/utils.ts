import { AuthError } from 'next-auth';

import { DEFAULT_LOGIN_PATH } from '@/routes';
import { ERROR_MESSAGES } from '@/lib/constants/messages';

import { signIn } from './auth';

export async function signInUser(email: string, password: string) {
  try {
    const res = await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_PATH,
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
      // Anything else — the user lookup failing, a misconfiguration — is not
      // the user's fault and must not read as a wrong password. Log it.
      console.error('[signInUser]', error);
      return { success: false, error: ERROR_MESSAGES.SOMETHING_WENT_WRONG };
    }
    throw error;
  }
}
