import { describe, expect, it } from 'vitest';

import { toEditPayload, transactionFormSchema } from './transactionForm';

const values = {
  transactionName: 'Coffee',
  transactionCategory: 'cafe',
  transactionType: 'Expenses',
  amount: 4.5,
  createdAt: new Date(),
};

describe('transactionFormSchema', () => {
  it("accepts the row's stored free-text payment method when editing", () => {
    expect(
      transactionFormSchema('Visa').safeParse({
        ...values,
        paymentMethod: 'Visa',
      }).success,
    ).toBe(true);
  });

  it('still requires Card or Cash for anything else', () => {
    const editing = transactionFormSchema('Visa');
    const creating = transactionFormSchema();

    expect(
      editing.safeParse({ ...values, paymentMethod: 'Crypto' }).success,
    ).toBe(false);
    expect(editing.safeParse({ ...values, paymentMethod: '' }).success).toBe(
      false,
    );
    expect(
      creating.safeParse({ ...values, paymentMethod: 'Visa' }).success,
    ).toBe(false);
    expect(
      creating.safeParse({ ...values, paymentMethod: 'Card' }).success,
    ).toBe(true);
  });
});

describe('toEditPayload', () => {
  it('leaves an untouched free-text payment method out, so the row keeps it', () => {
    const parsed = transactionFormSchema('Visa').parse({
      ...values,
      paymentMethod: 'Visa',
    });
    expect(toEditPayload(parsed)).not.toHaveProperty('paymentMethod');
  });

  it('sends Card or Cash when the user picks one', () => {
    const parsed = transactionFormSchema('Visa').parse({
      ...values,
      paymentMethod: 'Cash',
    });
    expect(toEditPayload(parsed)).toMatchObject({ paymentMethod: 'Cash' });
  });
});
