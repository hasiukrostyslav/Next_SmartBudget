import { IconName } from '@/types/types';

// Navigation Links
export const navLinks: {
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
];

// Selects
export const transactionCategories: {
  type: 'income' | 'expenses';
  name: string;
  icon: IconName;
}[] = [
  { type: 'income', name: 'income', icon: 'income' },
  { type: 'income', name: 'investments', icon: 'investments' },
  { type: 'income', name: 'prize', icon: 'prize' },
  { type: 'income', name: 'currency exchange', icon: 'currency-exchange' },
  { type: 'expenses', name: 'advertisement', icon: 'advertisement' },
  { type: 'expenses', name: 'appliance', icon: 'appliance' },
  { type: 'expenses', name: 'books', icon: 'books' },
  { type: 'expenses', name: 'cafe', icon: 'cafe' },
  { type: 'expenses', name: 'car', icon: 'car' },
  { type: 'expenses', name: 'clothes', icon: 'clothes' },
  { type: 'expenses', name: 'delivery', icon: 'delivery' },
  { type: 'expenses', name: 'donations', icon: 'donations' },
  { type: 'expenses', name: 'electricity', icon: 'electricity' },
  { type: 'expenses', name: 'entertainment', icon: 'entertainment' },
  { type: 'expenses', name: 'flowers', icon: 'flowers' },
  { type: 'expenses', name: 'gas', icon: 'gas' },
  { type: 'expenses', name: 'groceries', icon: 'groceries' },
  { type: 'expenses', name: 'healthcare', icon: 'healthcare' },
  { type: 'expenses', name: 'insurance', icon: 'insurance' },
  { type: 'expenses', name: 'internet', icon: 'internet' },
  { type: 'expenses', name: 'jewelry', icon: 'jewelry' },
  { type: 'expenses', name: 'loan', icon: 'loan' },
  { type: 'expenses', name: 'mobile phone', icon: 'mobile-phone' },
  { type: 'expenses', name: 'movies', icon: 'movies' },
  { type: 'expenses', name: 'others', icon: 'others' },
  { type: 'expenses', name: 'personal care', icon: 'personal-care' },
  { type: 'expenses', name: 'pet care', icon: 'pet-care' },
  { type: 'expenses', name: 'repair', icon: 'repair' },
  { type: 'expenses', name: 'sport', icon: 'sport' },
  { type: 'expenses', name: 'taxes', icon: 'taxes' },
  { type: 'expenses', name: 'taxi', icon: 'taxi' },
  { type: 'expenses', name: 'transfer', icon: 'transfer' },
  { type: 'expenses', name: 'travel', icon: 'travel' },
  { type: 'expenses', name: 'utilities', icon: 'utility' },
  { type: 'expenses', name: 'water', icon: 'water' },
];

export const transactionTypes: {
  name: 'income' | 'expenses';
  icon: IconName;
}[] = [
  { name: 'income', icon: 'income' },
  { name: 'expenses', icon: 'loan' },
];

export const transactionStatus = {
  pending: 'pending',
  completed: 'completed',
  failed: 'failed',
} as const;

export const currency = [
  { local: 'eng', currency: 'UAH' },
  { local: 'eng', currency: 'USD' },
  { local: 'eng', currency: 'EUR' },
  { local: 'eng', currency: 'PLN' },
  { local: 'eng', currency: 'HUF' },
  { local: 'eng', currency: 'GBP' },
];

// Radio
export const transactionTypesOptions = [
  { label: 'Income', value: 'income' },
  { label: 'Expenses', value: 'expenses' },
];
