import { icons } from '@/lib/constants/icons';

import type { Transaction } from '../../generated/client';

export type IconName = (typeof icons)[number]['role'];

// A transactions row as the UI receives it: the Prisma model, with the Decimal
// amount converted to a number at the data boundary (lib/db/transactions).
// Derived rather than re-declared, so a schema change can't leave it stale.
export type TransactionItem = Omit<Transaction, 'amount'> & { amount: number };

export type ItemType =
  | 'transaction'
  | 'payment'
  | 'card'
  | 'saving'
  | 'loan'
  | 'deposit';

export interface SelectOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: IconName;
  symbol?: string;
  color?: string;
}
