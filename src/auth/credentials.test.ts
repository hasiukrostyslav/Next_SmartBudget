import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/db/users', () => ({ getUserByEmail: vi.fn() }));
vi.mock('@/lib/rateLimit', () => ({
  isLoginAllowed: vi.fn(async () => true),
  isSignUpAllowed: vi.fn(async () => true),
  recordLoginFailure: vi.fn(async () => {}),
}));

const { getUserByEmail } = await import('@/lib/db/users');
const rateLimit = await import('@/lib/rateLimit');
const { RateLimitedSignIn } = await import('./errors');
const { verifyCredentials } = await import('./credentials');

const password = 'correct horse battery';
const user = {
  id: 'user-1',
  name: 'User',
  email: 'user@example.com',
  emailVerified: null,
  image: null,
  password: bcrypt.hashSync(password, 4),
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getUserByEmail).mockReset();
});

describe('verifyCredentials', () => {
  it('returns the user for the right password', async () => {
    vi.mocked(getUserByEmail).mockResolvedValueOnce(user);
    await expect(
      verifyCredentials({ email: user.email, password }),
    ).resolves.toMatchObject({ id: 'user-1' });
    expect(rateLimit.isLoginAllowed).toHaveBeenCalledWith(user.email);
  });

  it('returns null for a wrong password', async () => {
    vi.mocked(getUserByEmail).mockResolvedValueOnce(user);
    await expect(
      verifyCredentials({ email: user.email, password: 'wrong' }),
    ).resolves.toBeNull();
  });

  it('still runs one bcrypt comparison when the email has no account', async () => {
    vi.mocked(getUserByEmail).mockResolvedValueOnce(null);
    const compare = vi.spyOn(bcrypt, 'compare');

    await expect(
      verifyCredentials({ email: 'nobody@example.com', password }),
    ).resolves.toBeNull();
    expect(compare).toHaveBeenCalledOnce();

    compare.mockRestore();
  });

  it('rejects a password-less account even if the dummy password is guessed', async () => {
    vi.mocked(getUserByEmail).mockResolvedValueOnce({
      ...user,
      password: null,
    });
    await expect(
      verifyCredentials({ email: user.email, password: 'timing-equalizer' }),
    ).resolves.toBeNull();
  });

  it('refuses a rate-limited attempt before any lookup or comparison', async () => {
    vi.mocked(rateLimit.isLoginAllowed).mockResolvedValueOnce(false);
    const compare = vi.spyOn(bcrypt, 'compare');

    await expect(
      verifyCredentials({ email: user.email, password }),
    ).rejects.toBeInstanceOf(RateLimitedSignIn);
    expect(getUserByEmail).not.toHaveBeenCalled();
    expect(compare).not.toHaveBeenCalled();

    compare.mockRestore();
  });

  it('counts a failed attempt, and only a failed one', async () => {
    vi.mocked(getUserByEmail).mockResolvedValueOnce(user);
    await verifyCredentials({ email: user.email, password });
    expect(rateLimit.recordLoginFailure).not.toHaveBeenCalled();

    vi.mocked(getUserByEmail).mockResolvedValueOnce(user);
    await verifyCredentials({ email: user.email, password: 'wrong' });
    expect(rateLimit.recordLoginFailure).toHaveBeenCalledWith(user.email);
  });
});
