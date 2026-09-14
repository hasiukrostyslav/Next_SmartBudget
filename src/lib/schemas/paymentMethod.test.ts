import { describe, expect, it } from 'vitest';

import {
  TransactionSchema,
  UpdateTransactionSchema,
} from './transaction.schema';

const valid = {
  transactionName: 'Coffee',
  transactionCategory: 'cafe',
  transactionType: 'Expenses',
  amount: 4.5,
  createdAt: new Date(),
};

describe('paymentMethod', () => {
  it.each(['Card', 'Cash'])('accepts %s', (paymentMethod) => {
    expect(
      TransactionSchema.safeParse({ ...valid, paymentMethod }).success,
    ).toBe(true);
  });

  it.each(['', 'card', 'Crypto'])('rejects %j', (paymentMethod) => {
    expect(
      TransactionSchema.safeParse({ ...valid, paymentMethod }).success,
    ).toBe(false);
    expect(UpdateTransactionSchema.safeParse({ paymentMethod }).success).toBe(
      false,
    );
  });
});

describe('toPaymentMethod', () => {
  it('keeps a known method and drops a legacy value', async () => {
    const { toPaymentMethod } = await import('../constants/transactions');
    expect(toPaymentMethod('Cash')).toBe('Cash');
    expect(toPaymentMethod('Card')).toBe('Card');
    expect(toPaymentMethod('Visa')).toBeUndefined();
    expect(toPaymentMethod('')).toBeUndefined();
  });
});
