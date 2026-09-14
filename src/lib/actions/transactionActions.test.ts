import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('@/auth/auth', () => ({
  auth: vi.fn(async () => ({ user: { id: 'user-1' } })),
}));
vi.mock('../db/transactions', () => ({
  updateTransactionById: vi.fn(async () => ({ count: 1 })),
  updateTransactionStatusMany: vi.fn(async () => ({ count: 1 })),
  updateTransactionCategoryMany: vi.fn(async () => ({ count: 1 })),
  deleteTransactionById: vi.fn(async () => ({ count: 1 })),
  deleteTransactionsMany: vi.fn(async () => ({ count: 1 })),
  deleteTransactionsAll: vi.fn(),
  createTransaction: vi.fn(),
  findTransactionById: vi.fn(),
  findTransactionsByUserId: vi.fn(),
}));

const db = await import('../db/transactions');
const actions = await import('./transactionActions');

beforeEach(() => vi.clearAllMocks());

describe('transaction mutations validate their input', () => {
  it('editTransaction drops an injected userId before the query', async () => {
    const result = await actions.editTransaction('tx-1', {
      transactionName: 'Renamed',
      userId: 'victim',
    } as never);

    expect(result.success).toBe(true);
    expect(db.updateTransactionById).toHaveBeenCalledWith('tx-1', 'user-1', {
      transactionName: 'Renamed',
    });
  });

  it('editTransaction rejects an invalid field with 422 and no query', async () => {
    const result = await actions.editTransaction('tx-1', {
      currency: 'BTC',
    } as never);

    expect(result).toMatchObject({ success: false, status: 422 });
    expect(db.updateTransactionById).not.toHaveBeenCalled();
  });

  it('changeTransactionStatus rejects an unknown status', async () => {
    const result = await actions.changeTransactionStatus(
      ['tx-1'],
      'REFUNDED' as never,
    );

    expect(result).toMatchObject({ success: false, status: 422 });
    expect(db.updateTransactionStatusMany).not.toHaveBeenCalled();
  });

  it('changeTransactionCategory rejects a non-array id list', async () => {
    const result = await actions.changeTransactionCategory(
      'tx-1' as never,
      'cafe',
    );

    expect(result).toMatchObject({ success: false, status: 422 });
    expect(db.updateTransactionCategoryMany).not.toHaveBeenCalled();
  });

  it('deleteManyTransaction rejects an empty selection', async () => {
    const result = await actions.deleteManyTransaction([]);

    expect(result).toMatchObject({ success: false, status: 422 });
    expect(db.deleteTransactionsMany).not.toHaveBeenCalled();
  });
});
