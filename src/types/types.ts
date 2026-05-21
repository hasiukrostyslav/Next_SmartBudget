import { icons } from '@/lib/constants/icons';
import { TRANSACTION_CATEGORIES, transactionStatus } from '@/lib/constants/ui';

export type IconName = (typeof icons)[number]['role'];

// Toast Component types
interface ToastStyleProps<I extends IconName> {
  icon: I;
  bgIcon: string;
  border: string;
  bg: string;
}

export interface ToastRoles {
  success: ToastStyleProps<'check'>;
  error: ToastStyleProps<'close'>;
  info: ToastStyleProps<'info'>;
  warning: ToastStyleProps<'warning'>;
}

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
  transactionCategory: keyof typeof TRANSACTION_CATEGORIES;
  paymentMethod: string;
  transactionType: 'Income' | 'Expenses';
  currency: 'UAH' | 'USD' | 'EUR' | 'PLN' | 'HUF' | 'GBP';
  amount: number;
  description?: string | null;
  status: keyof typeof transactionStatus;
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
  type: 'Income' | 'Expenses';
  amount: number;
  currency: 'UAH' | 'USD' | 'EUR' | 'PLN' | 'HUF' | 'GBP';
}
