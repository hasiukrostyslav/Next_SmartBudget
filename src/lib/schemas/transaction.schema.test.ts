import { describe, expect, it } from 'vitest';

import {
  CategorySchema,
  IdListSchema,
  StatusSchema,
  TransactionSchema,
  UpdateTransactionSchema,
} from './transaction.schema';

// Real id shapes found in the shared table.
const PRISMA_CUID = 'cjld2cjxh0000qzrmn831i7rn';
const EXPRESS_CUID2 = 'tz4a98xxat96iws9zmbrgj3a';

describe('UpdateTransactionSchema', () => {
  it('does not fill in currency or status on a partial edit', () => {
    expect(
      UpdateTransactionSchema.parse({ transactionName: 'Renamed' }),
    ).toEqual({
      transactionName: 'Renamed',
    });
    const amountOnly = UpdateTransactionSchema.parse({ amount: 12 });
    expect(amountOnly).not.toHaveProperty('currency');
    expect(amountOnly).not.toHaveProperty('status');
  });

  it('strips ownership and identity fields a client might inject', () => {
    const parsed = UpdateTransactionSchema.parse({
      transactionName: 'x',
      userId: 'someone-else',
      transactionId: 'another-row',
    });
    expect(parsed).not.toHaveProperty('userId');
    expect(parsed).not.toHaveProperty('transactionId');
  });

  it('rejects values outside the enums', () => {
    expect(
      UpdateTransactionSchema.safeParse({ status: 'STOLEN' }).success,
    ).toBe(false);
  });
});

describe('TransactionSchema', () => {
  it('still defaults currency and status on create', () => {
    const parsed = TransactionSchema.parse({
      transactionName: 'Coffee',
      transactionCategory: 'cafe',
      transactionType: 'Expenses',
      paymentMethod: 'Card',
      amount: 12.5,
      createdAt: new Date(),
    });
    expect(parsed.currency).toBe('UAH');
    expect(parsed.status).toBe('COMPLETED');
  });
});

describe('id and enum inputs', () => {
  it('accepts both id formats present in the table', () => {
    expect(IdListSchema.safeParse([PRISMA_CUID, EXPRESS_CUID2]).success).toBe(
      true,
    );
  });

  it('rejects empty, oversized and non-string id lists', () => {
    expect(IdListSchema.safeParse([]).success).toBe(false);
    expect(IdListSchema.safeParse(Array(101).fill(PRISMA_CUID)).success).toBe(
      false,
    );
    expect(IdListSchema.safeParse([{ $ne: null }]).success).toBe(false);
  });

  it('rejects unknown statuses and categories', () => {
    expect(StatusSchema.safeParse('REFUNDED').success).toBe(false);
    expect(CategorySchema.safeParse('currency exchange').success).toBe(false);
    expect(CategorySchema.safeParse('currency_exchange').success).toBe(true);
  });
});
