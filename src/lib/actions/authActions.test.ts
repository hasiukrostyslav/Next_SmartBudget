import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ERROR_MESSAGES } from '../constants/messages';

vi.mock('@/auth/utils', () => ({
  signInWithCredentials: vi.fn(async () => ({ success: true })),
}));
vi.mock('../db/users', () => ({ getUserByEmail: vi.fn(async () => null) }));
vi.mock('../rateLimit', () => ({
  isLoginAllowed: vi.fn(async () => true),
  isSignUpAllowed: vi.fn(async () => true),
}));

const users = await import('../db/users');
const rateLimit = await import('../rateLimit');
const { signInWithCredentials } = await import('@/auth/utils');
const { login, signUp } = await import('./authActions');

const form = {
  name: 'New User',
  email: 'new@example.com',
  password: 'Str0ng!pass',
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('signUp', () => {
  it('creates and signs in through the sign-up provider', async () => {
    await expect(signUp(form)).resolves.toBeUndefined();
    expect(signInWithCredentials).toHaveBeenCalledWith(
      'signup',
      form,
      ERROR_MESSAGES.auth.EMAIL_EXISTS,
    );
  });

  it('reports an email that already has an account before trying', async () => {
    vi.mocked(users.getUserByEmail).mockResolvedValueOnce({
      id: 'user-1',
    } as never);

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.EMAIL_EXISTS,
    });
    expect(signInWithCredentials).not.toHaveBeenCalled();
  });

  it('reports a database outage as an error, not as a free email', async () => {
    vi.mocked(users.getUserByEmail).mockRejectedValueOnce(
      new Error('connection refused'),
    );

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
    });
    expect(signInWithCredentials).not.toHaveBeenCalled();
  });

  it("passes on the provider's rejection", async () => {
    vi.mocked(signInWithCredentials).mockResolvedValueOnce({
      success: false,
      error: ERROR_MESSAGES.auth.EMAIL_EXISTS,
    });

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.EMAIL_EXISTS,
    });
  });

  it('stops before any lookup once the client is rate limited', async () => {
    vi.mocked(rateLimit.isSignUpAllowed).mockResolvedValueOnce(false);

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS,
    });
    expect(users.getUserByEmail).not.toHaveBeenCalled();
    expect(signInWithCredentials).not.toHaveBeenCalled();
  });
});

describe('login', () => {
  const credentials = { email: 'user@example.com', password: 'anything' };

  it('counts the attempt against the account, then signs in', async () => {
    await login(credentials);

    expect(rateLimit.isLoginAllowed).toHaveBeenCalledWith(credentials.email);
    expect(signInWithCredentials).toHaveBeenCalledWith(
      'credentials',
      credentials,
      ERROR_MESSAGES.auth.INVALID_EMAIL_OR_PASSWORD,
    );
  });

  it('refuses to check the password once rate limited', async () => {
    vi.mocked(rateLimit.isLoginAllowed).mockResolvedValueOnce(false);

    await expect(login(credentials)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS,
    });
    expect(signInWithCredentials).not.toHaveBeenCalled();
  });
});
