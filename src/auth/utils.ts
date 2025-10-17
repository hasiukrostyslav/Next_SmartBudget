import { AuthError } from 'next-auth';
import { signIn } from './auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

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
        return { success: false, error: 'Invalid email or password!' };
      }
      return { success: false, error: 'Something went wrong' };
    }
    throw error;
  }
}
