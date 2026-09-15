import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('@/auth/auth', () => ({
  auth: vi.fn(async () => ({ user: { id: 'user-1' } })),
}));
vi.mock('../db/transactions', () => ({
  deleteTransactionById: vi.fn(async () => ({ count: 1 })),
}));

const { revalidatePath } = await import('next/cache');
const { auth } = await import('@/auth/auth');
const db = await import('../db/transactions');
const { deleteTransaction } = await import('./transactionActions');

beforeEach(() => vi.clearAllMocks());

describe('every mutation', () => {
  it('refuses without a session and never queries', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null as never);

    await expect(
      deleteTransaction('cjld2cjxh0000qzrmn831i7rn'),
    ).resolves.toMatchObject({
      success: false,
      status: 401,
    });
    expect(db.deleteTransactionById).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it('revalidates the list after a successful write', async () => {
    await expect(
      deleteTransaction('cjld2cjxh0000qzrmn831i7rn'),
    ).resolves.toMatchObject({
      success: true,
      status: 200,
      data: { count: 1 },
    });
    expect(db.deleteTransactionById).toHaveBeenCalledWith(
      'cjld2cjxh0000qzrmn831i7rn',
      'user-1',
    );
    expect(revalidatePath).toHaveBeenCalledOnce();
  });

  it('logs a failed write, reports 500 and does not revalidate', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(db.deleteTransactionById).mockRejectedValueOnce(
      new Error('connection refused'),
    );

    await expect(
      deleteTransaction('cjld2cjxh0000qzrmn831i7rn'),
    ).resolves.toMatchObject({
      success: false,
      status: 500,
    });
    expect(log).toHaveBeenCalledWith('[deleteTransaction]', expect.any(Error));
    expect(revalidatePath).not.toHaveBeenCalled();
    log.mockRestore();
  });
});
