import type {
  Currency,
  Status,
  TransactionCategories,
  TransactionType,
} from '@/lib/constants/enums';
import { icons } from '@/lib/constants/icons';

export type IconName = (typeof icons)[number]['role'];

export interface TransactionItem {
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  transactionId: string;
  transactionName: string;
  transactionCategory: TransactionCategories;
  paymentMethod: string;
  transactionType: TransactionType;
  currency: Currency;
  amount: number;
  description?: string | null;
  status: Status;
}

export type CreateTransactionData = Omit<
  TransactionItem,
  'updatedAt' | 'userId' | 'transactionId'
>;
export type UpdateTransactionData = Partial<
  Omit<TransactionItem, 'updatedAt' | 'userId' | 'transactionId'>
>;

export type ItemType =
  | 'transaction'
  | 'payment'
  | 'card'
  | 'saving'
  | 'loan'
  | 'deposit';

export interface DeleteItem {
  id: string;
  name: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
}
