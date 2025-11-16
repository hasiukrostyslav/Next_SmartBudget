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
  { type: 'income', name: 'Income', icon: 'income' },
  { type: 'income', name: 'Investments', icon: 'investments' },
  { type: 'income', name: 'Prize', icon: 'prize' },
  { type: 'expenses', name: 'Advertisement', icon: 'advertisement' },
  { type: 'expenses', name: 'Appliance', icon: 'appliance' },
  { type: 'expenses', name: 'Books', icon: 'books' },
  { type: 'expenses', name: 'Cafe', icon: 'cafe' },
  { type: 'expenses', name: 'Car', icon: 'car' },
  { type: 'expenses', name: 'Clothes', icon: 'clothes' },
  { type: 'expenses', name: 'Delivery', icon: 'delivery' },
  { type: 'expenses', name: 'Donations', icon: 'donations' },
  { type: 'expenses', name: 'Electricity', icon: 'electricity' },
  { type: 'expenses', name: 'Entertainment', icon: 'entertainment' },
  { type: 'expenses', name: 'Flowers', icon: 'flowers' },
  { type: 'expenses', name: 'Gas', icon: 'gas' },
  { type: 'expenses', name: 'Groceries', icon: 'groceries' },
  { type: 'expenses', name: 'Healthcare', icon: 'healthcare' },
  { type: 'expenses', name: 'Insurance', icon: 'insurance' },
  { type: 'expenses', name: 'Internet', icon: 'internet' },
  { type: 'expenses', name: 'Jewelry', icon: 'jewelry' },
  { type: 'expenses', name: 'Loan', icon: 'loan' },
  { type: 'expenses', name: 'Mobile Phone', icon: 'mobile-phone' },
  { type: 'expenses', name: 'Movies', icon: 'movies' },
  { type: 'expenses', name: 'Others', icon: 'others' },
  { type: 'expenses', name: 'Personal Care', icon: 'personal-care' },
  { type: 'expenses', name: 'Pet Care', icon: 'pet-care' },
  { type: 'expenses', name: 'Repair', icon: 'repair' },
  { type: 'expenses', name: 'Sport', icon: 'sport' },
  { type: 'expenses', name: 'Taxes', icon: 'taxes' },
  { type: 'expenses', name: 'Taxi', icon: 'taxi' },
  { type: 'expenses', name: 'Transfer', icon: 'transfer' },
  { type: 'expenses', name: 'Travel', icon: 'travel' },
  { type: 'expenses', name: 'Utilities', icon: 'utility' },
  { type: 'expenses', name: 'Water', icon: 'water' },
];

export const transactionTypes: {
  name: 'Income' | 'Expenses';
  icon: IconName;
}[] = [
  { name: 'Income', icon: 'income' },
  { name: 'Expenses', icon: 'loan' },
];
export const transactionStatus: ['Pending', 'Completed'] = [
  'Pending',
  'Completed',
];

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
