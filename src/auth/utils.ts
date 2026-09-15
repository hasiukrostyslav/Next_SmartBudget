import { AuthError } from 'next-auth';

import { DEFAULT_LOGIN_PATH } from '@/routes';
import { ERROR_MESSAGES } from '@/lib/constants/messages';

import { signIn } from './auth';

type CredentialsProvider = 'credentials' | 'signup';

// Signs in through one of the Credentials providers. On success Auth.js
// redirects by throwing, and that is rethrown. A rejected sign-in returns
// `rejectedMessage`; any other Auth.js error (a failing lookup, a
// misconfiguration) is not the user's fault: it is logged and reported
// generically.
export async function signInWithCredentials(
  provider: CredentialsProvider,
  fields: Record<string, string>,
  rejectedMessage: string,
  redirectTo: string = DEFAULT_LOGIN_PATH,
) {
  try {
    await signIn(provider, { ...fields, redirectTo });
    return { success: true as const };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin')
        return { success: false as const, error: rejectedMessage };

      console.error('[signInWithCredentials]', error);
      return {
        success: false as const,
        error: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
      };
    }
    throw error;
  }
}
