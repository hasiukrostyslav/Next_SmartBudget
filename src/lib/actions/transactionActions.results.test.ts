import { describe, expect, it, vi } from 'vitest';

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('@/auth/auth', () => ({
  auth: vi.fn(async () => ({ user: { id: 'user-1' } })),
}));
vi.mock('../db/transactions', () => ({ updateTransactionById: vi.fn() }));

const { createTransaction, editTransaction } =
  await import('./transactionActions');

describe('action results', () => {
  it('create returns a readable message and field errors on invalid input', async () => {
    const result = await createTransaction({ transactionName: '' } as never);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.status).toBe(422);
    expect(typeof result.error).toBe('string');
    expect(result.fieldErrors?.transactionName?.[0]).toBe(
      'Transaction name is required.',
    );
  });

  it('edit reports which field was invalid', async () => {
    const result = await editTransaction('tx-1', { currency: 'BTC' } as never);

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(typeof result.error).toBe('string');
    expect(result.fieldErrors).toHaveProperty('currency');
  });
});
