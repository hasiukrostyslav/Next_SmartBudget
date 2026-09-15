import { IconName } from '@/types/types';

// Navigation Links
export const NAV_LINKS_CONFIG: {
  type: 'main' | 'setting';
  page: string;
  icon: IconName;
}[] = [
  { type: 'main', page: 'dashboard', icon: 'dashboard' },
  { type: 'main', page: 'transactions', icon: 'transfer' },
  { type: 'main', page: 'payments', icon: 'payment' },
  { type: 'main', page: 'cards', icon: 'card' },
  { type: 'main', page: 'savings', icon: 'saving' },
  { type: 'main', page: 'loans', icon: 'percent' },
  { type: 'main', page: 'deposits', icon: 'income' },
  { type: 'setting', page: 'profile', icon: 'user' },
  { type: 'setting', page: 'settings', icon: 'settings' },
] as const;

// Every param that narrows the transactions list. `date` and `amount` were
// listed here and in the schema but had no URL format, no control and no query,
// so they are gone until that feature exists.
export const TRANSACTION_FILTERS = [
  'search',
  'category',
  'account',
  'currency',
  'status',
  'type',
] as const;
