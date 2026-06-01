import type {
  Currency,
  Status,
  TransactionCategories,
  TransactionType,
} from '@/lib/constants/enums';
import { icons } from '@/lib/constants/icons';

export type IconName = (typeof icons)[number]['role'];

// Auth input with icons types
export interface InputIcons {
  name: Extract<IconName, 'name'>;
  email: Extract<IconName, 'email'>;
  password: Extract<IconName, 'password'>;
}

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

export type TransactionCreateInput = Omit<
  TransactionItem,
  'createdAt' | 'updatedAt' | 'userId' | 'transactionId'
>;
export type TransactionUpdate = Partial<
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
