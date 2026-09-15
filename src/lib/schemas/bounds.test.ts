import { describe, expect, it } from 'vitest';

import { SignInSchema, SignUpSchema } from './auth.schema';
import {
  SearchParamsSchema,
  TransactionSchema,
  UpdateTransactionSchema,
} from './transaction.schema';

const transaction = {
  transactionName: 'Coffee',
  transactionCategory: 'cafe',
  transactionType: 'Expenses',
  paymentMethod: 'Card',
  amount: 4.5,
  createdAt: new Date(),
};

describe('input bounds', () => {
  it('rejects an oversized transaction name or note', () => {
    expect(
      TransactionSchema.safeParse({
        ...transaction,
        transactionName: 'x'.repeat(101),
      }).success,
    ).toBe(false);
    expect(
      UpdateTransactionSchema.safeParse({ description: 'x'.repeat(501) })
        .success,
    ).toBe(false);
    expect(
      TransactionSchema.safeParse({
        ...transaction,
        transactionName: 'x'.repeat(100),
      }).success,
    ).toBe(true);
  });

  it('cuts an oversized search instead of rejecting the page', () => {
    expect(
      SearchParamsSchema.parse({ search: 'x'.repeat(5000) }).search,
    ).toHaveLength(100);
  });

  it('rejects oversized credentials', () => {
    expect(
      SignUpSchema.safeParse({
        name: 'x'.repeat(101),
        email: 'user@example.com',
        password: 'Str0ng!pass',
      }).success,
    ).toBe(false);
    expect(
      SignUpSchema.safeParse({
        name: 'User',
        email: 'user@example.com',
        password: 'Str0ng!' + 'x'.repeat(70),
      }).success,
    ).toBe(false);
    expect(
      SignInSchema.safeParse({
        email: 'user@example.com',
        password: 'x'.repeat(1001),
      }).success,
    ).toBe(false);
    expect(
      SignInSchema.safeParse({
        email: `${'x'.repeat(250)}@example.com`,
        password: 'x',
      }).success,
    ).toBe(false);
  });

  it('limits passwords to the 72 bytes bcrypt reads, not 72 characters', () => {
    const signUp = (password: string) =>
      SignUpSchema.safeParse({
        name: 'User',
        email: 'user@example.com',
        password,
      }).success;

    // "ж" is 2 bytes in UTF-8.
    expect(signUp('a1!' + 'ж'.repeat(34))).toBe(true); // 71 bytes, 37 characters
    expect(signUp('a1!' + 'ж'.repeat(35))).toBe(false); // 73 bytes, 38 characters
    expect(signUp('a1!' + 'x'.repeat(69))).toBe(true); // 72 bytes
  });
});
