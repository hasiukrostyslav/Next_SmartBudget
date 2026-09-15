import { describe, expect, it } from 'vitest';

import {
  TransactionSchema,
  UpdateTransactionSchema,
} from './transaction.schema';

const valid = {
  transactionName: 'Coffee',
  transactionCategory: 'cafe',
  transactionType: 'Expenses',
  paymentMethod: 'Card',
  amount: 4.5,
  createdAt: new Date(),
};

describe('transactionName', () => {
  it.each(['', '   ', '\t\n'])('rejects a blank name (%j)', (name) => {
    expect(
      TransactionSchema.safeParse({ ...valid, transactionName: name }).success,
    ).toBe(false);
    expect(
      UpdateTransactionSchema.safeParse({ transactionName: name }).success,
    ).toBe(false);
  });

  it('stores the trimmed name', () => {
    expect(
      TransactionSchema.parse({ ...valid, transactionName: '  Coffee  ' })
        .transactionName,
    ).toBe('Coffee');
  });
});
