import { expect, it } from 'vitest';

import type { TransactionItem } from '@/types/types';

import { calcDeletedBalance } from './utils';

it('keeps currencies in the order they first appear', () => {
  const items = [
    { amount: 1, transactionType: 'Income', currency: 'USD' },
    { amount: 2, transactionType: 'Expenses', currency: 'UAH' },
    { amount: 3, transactionType: 'Income', currency: 'USD' },
  ] as TransactionItem[];

  expect(calcDeletedBalance(items)).toEqual([
    { currency: 'USD', total: 4 },
    { currency: 'UAH', total: -2 },
  ]);
});
