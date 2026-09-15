import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ERROR_MESSAGES } from '../constants/messages';

vi.mock('@/auth/utils', () => ({
  signInWithCredentials: vi.fn(async () => ({ success: true })),
}));

const { signInWithCredentials } = await import('@/auth/utils');
const { login, signUp } = await import('./authActions');

const form = {
  name: 'New User',
  email: 'new@example.com',
  password: 'Str0ng!pass',
};

beforeEach(() => vi.clearAllMocks());

describe('signUp', () => {
  it('creates and signs in through the sign-up provider', async () => {
    await expect(signUp(form)).resolves.toBeUndefined();
    expect(signInWithCredentials).toHaveBeenCalledWith(
      'signup',
      form,
      ERROR_MESSAGES.auth.EMAIL_EXISTS,
    );
  });

  it("passes on the provider's rejection", async () => {
    vi.mocked(signInWithCredentials).mockResolvedValueOnce({
      success: false,
      error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS,
    });

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS,
    });
  });

  it('rejects invalid input without reaching the provider', async () => {
    await expect(signUp({ ...form, password: 'weak' })).resolves.toEqual({
      error: ERROR_MESSAGES.auth.INVALID_CREDENTIALS,
    });
    expect(signInWithCredentials).not.toHaveBeenCalled();
  });
});

describe('login', () => {
  const credentials = { email: 'user@example.com', password: 'anything' };

  it('signs in through the credentials provider', async () => {
    await login(credentials);

    expect(signInWithCredentials).toHaveBeenCalledWith(
      'credentials',
      credentials,
      ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD,
      '/dashboard',
    );
  });

  it.each([
    ['/dashboard/transactions?page=2', '/dashboard/transactions?page=2'],
    ['//evil.example', '/dashboard'],
    [{ toString: (): string => '/dashboard/cards' }, '/dashboard'],
  ])(
    'redirects to the checked callbackUrl %j',
    async (callbackUrl, expected) => {
      await login(credentials, callbackUrl);

      expect(signInWithCredentials).toHaveBeenLastCalledWith(
        'credentials',
        credentials,
        ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD,
        expected,
      );
    },
  );

  it("passes on the provider's rate-limit message", async () => {
    vi.mocked(signInWithCredentials).mockResolvedValueOnce({
      success: false,
      error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS,
    });

    await expect(login(credentials)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS,
    });
  });
});
