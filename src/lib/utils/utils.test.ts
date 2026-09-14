import { describe, expect, it } from 'vitest';

import type { TransactionItem } from '@/types/types';

import { calcDeletedBalance } from './utils';

const item = (
  amount: number,
  transactionType: 'Income' | 'Expenses',
  currency = 'UAH',
) => ({ amount, transactionType, currency }) as TransactionItem;

describe('calcDeletedBalance', () => {
  it('sums amounts without floating point drift', () => {
    expect(
      calcDeletedBalance([item(0.1, 'Income'), item(0.2, 'Income')]),
    ).toEqual([{ currency: 'UAH', total: 0.3 }]);
    expect(
      calcDeletedBalance([item(100.1, 'Income'), item(200.2, 'Income')])[0]
        .total,
    ).toBe(300.3);
  });

  it('nets income against expenses, per currency', () => {
    expect(
      calcDeletedBalance([
        item(50.25, 'Income'),
        item(20.1, 'Expenses'),
        item(9.99, 'Expenses', 'USD'),
      ]),
    ).toEqual([
      { currency: 'UAH', total: 30.15 },
      { currency: 'USD', total: -9.99 },
    ]);
  });
});
