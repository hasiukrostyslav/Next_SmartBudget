import * as z from 'zod';

import { PAYMENT_METHODS, type PaymentMethod } from '../constants/transactions';
import { TransactionSchema } from './transaction.schema';

const isPaymentMethod = (value: string): value is PaymentMethod =>
  (PAYMENT_METHODS as readonly string[]).includes(value);

// The transaction form's schema. A row the Express server created can hold a
// payment method other than Card or Cash, because its column is free text.
// Editing such a row keeps that value unless the user picks Card or Cash.
// Requiring Card or Cash here left the field empty and made Save silently
// do nothing, or forced the stored value to be overwritten.
export function transactionFormSchema(storedPaymentMethod?: string) {
  return TransactionSchema.extend({
    paymentMethod: z
      .string()
      .refine(
        (value) => isPaymentMethod(value) || value === storedPaymentMethod,
        { message: 'Payment method is required.' },
      ),
  });
}

export type TransactionFormValues = z.infer<
  ReturnType<typeof transactionFormSchema>
>;

// What an edit sends. A payment method that isn't Card or Cash can only be the
// untouched stored value, so it is left out and the row keeps it; the server's
// update schema accepts only Card or Cash.
export function toEditPayload({
  paymentMethod,
  ...rest
}: TransactionFormValues) {
  return isPaymentMethod(paymentMethod) ? { ...rest, paymentMethod } : rest;
}

// A new transaction always has Card or Cash: the create form has no stored
// value to accept.
export function toCreatePayload(values: TransactionFormValues) {
  return { ...values, paymentMethod: values.paymentMethod as PaymentMethod };
}
