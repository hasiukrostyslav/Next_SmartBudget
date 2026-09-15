import { expect, it, vi } from 'vitest';

vi.mock('next/cache', () => ({ revalidatePath: vi.fn() }));
vi.mock('@/auth/auth', () => ({ auth: vi.fn() }));
vi.mock('../db/transactions', () => ({}));

it('exposes only mutations as Server Actions', async () => {
  const actions = await import('./transactionActions');

  expect(Object.keys(actions).sort()).toEqual([
    'changeTransactionCategory',
    'changeTransactionStatus',
    'createTransaction',
    'deleteManyTransaction',
    'deleteTransaction',
    'editTransaction',
  ]);
});
