import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/auth/auth', () => ({ auth: vi.fn() }));
vi.mock('../db/transactions', () => ({ findTransactionsByUserId: vi.fn() }));

const { auth } = await import('@/auth/auth');
const db = await import('../db/transactions');
const { getTransactions } = await import('./transactions');

beforeEach(() => vi.clearAllMocks());

describe('getTransactions', () => {
  it('refuses without a session and never queries', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null as never);

    await expect(getTransactions()).resolves.toMatchObject({
      success: false,
      status: 401,
    });
    expect(db.findTransactionsByUserId).not.toHaveBeenCalled();
  });

  it("returns the signed-in user's page", async () => {
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'user-1' } } as never);
    vi.mocked(db.findTransactionsByUserId).mockResolvedValueOnce({
      transactions: [],
      transactionCount: 0,
    });

    await expect(getTransactions()).resolves.toMatchObject({
      success: true,
      data: { transactionCount: 0 },
    });
    expect(db.findTransactionsByUserId).toHaveBeenCalledWith(
      'user-1',
      undefined,
    );
  });

  it('reports a database failure as a 500 and logs it', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'user-1' } } as never);
    vi.mocked(db.findTransactionsByUserId).mockRejectedValueOnce(
      new Error('connection refused'),
    );

    await expect(getTransactions()).resolves.toMatchObject({
      success: false,
      status: 500,
    });
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });
});
