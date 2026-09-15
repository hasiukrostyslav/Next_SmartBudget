import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/db/users', () => ({ getUserById: vi.fn() }));

const { getUserById } = await import('@/lib/db/users');
const { revalidateSessionToken } = await import('./session');

const NOW = 1_800_000_000;

beforeEach(() => vi.clearAllMocks());

describe('revalidateSessionToken', () => {
  it('ends the session when the account no longer exists', async () => {
    vi.mocked(getUserById).mockResolvedValueOnce(null);
    await expect(
      revalidateSessionToken({ sub: 'user-1' }, NOW),
    ).resolves.toBeNull();
  });

  it('records when the account was last confirmed', async () => {
    vi.mocked(getUserById).mockResolvedValueOnce({ id: 'user-1' } as never);
    await expect(
      revalidateSessionToken({ sub: 'user-1' }, NOW),
    ).resolves.toEqual({
      sub: 'user-1',
      accountCheckedAt: NOW,
    });
  });

  it('does not look the account up again within five minutes', async () => {
    const token = { sub: 'user-1', accountCheckedAt: NOW - 60 };
    await expect(revalidateSessionToken(token, NOW)).resolves.toBe(token);
    expect(getUserById).not.toHaveBeenCalled();
  });

  it('checks again once five minutes have passed', async () => {
    vi.mocked(getUserById).mockResolvedValueOnce({ id: 'user-1' } as never);
    await revalidateSessionToken(
      { sub: 'user-1', accountCheckedAt: NOW - 301 },
      NOW,
    );
    expect(getUserById).toHaveBeenCalledWith('user-1');
  });
});
