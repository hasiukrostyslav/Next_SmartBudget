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

const users = await import('../db/users');
const { signInUser } = await import('@/auth/utils');
const { signUp } = await import('./authActions');

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
});
