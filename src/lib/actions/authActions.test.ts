import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Prisma } from '../../../generated/client';
import { ERROR_MESSAGES } from '../constants/messages';

vi.mock('@/auth/utils', () => ({
  signInUser: vi.fn(async () => ({ success: true, data: undefined })),
}));
vi.mock('../db/users', () => ({
  getUserByEmail: vi.fn(async () => null),
  createUser: vi.fn(async () => ({ id: 'user-1' })),
}));
vi.mock('../rateLimit', () => ({
  isLoginAllowed: vi.fn(async () => true),
  isSignUpAllowed: vi.fn(async () => true),
}));

const users = await import('../db/users');
const rateLimit = await import('../rateLimit');
const { signInUser } = await import('@/auth/utils');
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
  it('signs in after the user row is created', async () => {
    await expect(signUp(form)).resolves.toBeUndefined();
    expect(users.createUser).toHaveBeenCalledOnce();
    expect(signInUser).toHaveBeenCalledWith(form.email, form.password);
  });

  it('reports a database outage as an error, not as a free email', async () => {
    vi.mocked(users.getUserByEmail).mockRejectedValueOnce(
      new Error('connection refused'),
    );

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
    });
    expect(users.createUser).not.toHaveBeenCalled();
    expect(signInUser).not.toHaveBeenCalled();
  });

  it('does not sign in when the INSERT fails', async () => {
    vi.mocked(users.createUser).mockRejectedValueOnce(new Error('timeout'));

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
    });
    expect(signInUser).not.toHaveBeenCalled();
  });

  it('reports a lost race on the same email as "email exists"', async () => {
    vi.mocked(users.createUser).mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: 'test',
      }),
    );

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.EMAIL_EXISTS,
    });
    expect(signInUser).not.toHaveBeenCalled();
  });

  it('stops before any lookup or hashing once the client is rate limited', async () => {
    vi.mocked(rateLimit.isSignUpAllowed).mockResolvedValueOnce(false);

    await expect(signUp(form)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS,
    });
    expect(users.getUserByEmail).not.toHaveBeenCalled();
    expect(users.createUser).not.toHaveBeenCalled();
    expect(signInUser).not.toHaveBeenCalled();
  });
});

describe('login', () => {
  const credentials = { email: 'user@example.com', password: 'anything' };

  it('counts the attempt against the account before signing in', async () => {
    await login(credentials);

    expect(rateLimit.isLoginAllowed).toHaveBeenCalledWith(credentials.email);
    expect(signInUser).toHaveBeenCalledWith(
      credentials.email,
      credentials.password,
    );
  });

  it('refuses to check the password once rate limited', async () => {
    vi.mocked(rateLimit.isLoginAllowed).mockResolvedValueOnce(false);

    await expect(login(credentials)).resolves.toEqual({
      error: ERROR_MESSAGES.auth.TOO_MANY_ATTEMPTS,
    });
    expect(signInUser).not.toHaveBeenCalled();
  });
});
