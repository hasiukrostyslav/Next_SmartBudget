import { CallbackRouteError, CredentialsSignin } from '@auth/core/errors';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ERROR_MESSAGES } from '@/lib/constants/messages';

vi.mock('./auth', () => ({ signIn: vi.fn() }));

const { signIn } = await import('./auth');
const { signInWithCredentials } = await import('./utils');

beforeEach(() => vi.clearAllMocks());

describe('signInWithCredentials', () => {
  it('signs in with the given provider and redirect', async () => {
    await expect(
      signInWithCredentials('signup', { email: 'a@b.c' }, 'rejected', '/next'),
    ).resolves.toEqual({ success: true });
    expect(signIn).toHaveBeenCalledWith('signup', {
      email: 'a@b.c',
      redirectTo: '/next',
    });
  });

  it('returns the rejected message for refused credentials', async () => {
    vi.mocked(signIn).mockRejectedValueOnce(new CredentialsSignin());
    await expect(
      signInWithCredentials('credentials', {}, 'rejected'),
    ).resolves.toEqual({
      success: false,
      error: 'rejected',
    });
  });

  it('logs any other Auth.js error and reports it generically', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(signIn).mockRejectedValueOnce(new CallbackRouteError());

    await expect(
      signInWithCredentials('credentials', {}, 'rejected'),
    ).resolves.toEqual({
      success: false,
      error: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
    });
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });

  it('rethrows anything else, including the success redirect', async () => {
    const redirect = Object.assign(new Error('NEXT_REDIRECT'), {
      digest: 'NEXT_REDIRECT;replace;/dashboard',
    });
    vi.mocked(signIn).mockRejectedValueOnce(redirect);
    await expect(
      signInWithCredentials('credentials', {}, 'rejected'),
    ).rejects.toBe(redirect);
  });
});
