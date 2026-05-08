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
] as const;

// Selects
export const transactionCategories: {
  type: 'income' | 'expenses';
  name: string;
  icon: IconName;
  color: string;
}[] = [
  {
    type: 'income',
    name: 'income',
    icon: 'income',
    color: 'bg-emerald-200 text-emerald-800',
  },
  {
    type: 'income',
    name: 'investments',
    icon: 'investments',
    color: 'bg-blue-300 text-blue-900',
  },
  {
    type: 'income',
    name: 'prize',
    icon: 'prize',
    color: 'bg-yellow-200 text-yellow-800',
  },
  {
    type: 'income',
    name: 'currency exchange',
    icon: 'currency-exchange',
    color: 'bg-amber-200 text-amber-800',
  },
  {
    type: 'expenses',
    name: 'advertisement',
    icon: 'advertisement',
    color: 'bg-orange-200 text-orange-800',
  },
  {
    type: 'expenses',
    name: 'appliance',
    icon: 'appliance',
    color: 'bg-cyan-300 text-cyan-900',
  },
  {
    type: 'expenses',
    name: 'books',
    icon: 'books',
    color: 'bg-indigo-300 text-indigo-900',
  },
  {
    type: 'expenses',
    name: 'cafe',
    icon: 'cafe',
    color: 'bg-rose-200 text-rose-800',
  },
  {
    type: 'expenses',
    name: 'car',
    icon: 'car',
    color: 'bg-sky-300 text-sky-900',
  },
  {
    type: 'expenses',
    name: 'clothes',
    icon: 'clothes',
    color: 'bg-pink-200 text-pink-800',
  },
  {
    type: 'expenses',
    name: 'delivery',
    icon: 'delivery',
    color: 'bg-teal-200 text-teal-800',
  },
  {
    type: 'expenses',
    name: 'donations',
    icon: 'donations',
    color: 'bg-violet-200 text-violet-800',
  },
  {
    type: 'expenses',
    name: 'electricity',
    icon: 'electricity',
    color: 'bg-lime-200 text-lime-800',
  },
  {
    type: 'expenses',
    name: 'entertainment',
    icon: 'entertainment',
    color: 'bg-purple-200 text-purple-800',
  },
  {
    type: 'expenses',
    name: 'flowers',
    icon: 'flowers',
    color: 'bg-fuchsia-200 text-fuchsia-800',
  },
  {
    type: 'expenses',
    name: 'gas',
    icon: 'gas',
    color: 'bg-red-200 text-red-800',
  },
  {
    type: 'expenses',
    name: 'groceries',
    icon: 'groceries',
    color: 'bg-green-200 text-green-800',
  },
  {
    type: 'expenses',
    name: 'healthcare',
    icon: 'healthcare',
    color: 'bg-emerald-300 text-emerald-900',
  },
  {
    type: 'expenses',
    name: 'insurance',
    icon: 'insurance',
    color: 'bg-blue-400 text-blue-900',
  },
  {
    type: 'expenses',
    name: 'internet',
    icon: 'internet',
    color: 'bg-cyan-400 text-cyan-900',
  },
  {
    type: 'expenses',
    name: 'jewelry',
    icon: 'jewelry',
    color: 'bg-yellow-300 text-yellow-900',
  },
  {
    type: 'expenses',
    name: 'loan',
    icon: 'loan',
    color: 'bg-red-300 text-red-900',
  },
  {
    type: 'expenses',
    name: 'mobile phone',
    icon: 'mobile-phone',
    color: 'bg-indigo-400 text-indigo-900',
  },
  {
    type: 'expenses',
    name: 'movies',
    icon: 'movies',
    color: 'bg-purple-300 text-purple-900',
  },
  {
    type: 'expenses',
    name: 'others',
    icon: 'others',
    color: 'bg-amber-300 text-amber-900',
  },
  {
    type: 'expenses',
    name: 'personal care',
    icon: 'personal-care',
    color: 'bg-pink-300 text-pink-900',
  },
  {
    type: 'expenses',
    name: 'pet care',
    icon: 'pet-care',
    color: 'bg-orange-300 text-orange-900',
  },
  {
    type: 'expenses',
    name: 'repair',
    icon: 'repair',
    color: 'bg-teal-300 text-teal-900',
  },
  {
    type: 'expenses',
    name: 'sport',
    icon: 'sport',
    color: 'bg-green-300 text-green-900',
  },
  {
    type: 'expenses',
    name: 'taxes',
    icon: 'taxes',
    color: 'bg-rose-300 text-rose-900',
  },
  {
    type: 'expenses',
    name: 'taxi',
    icon: 'taxi',
    color: 'bg-sky-400 text-sky-900',
  },
  {
    type: 'expenses',
    name: 'transfer',
    icon: 'transfer',
    color: 'bg-violet-300 text-violet-900',
  },
  {
    type: 'expenses',
    name: 'travel',
    icon: 'travel',
    color: 'bg-fuchsia-300 text-fuchsia-900',
  },
  {
    type: 'expenses',
    name: 'utilities',
    icon: 'utility',
    color: 'bg-lime-300 text-lime-900',
  },
  {
    type: 'expenses',
    name: 'water',
    icon: 'water',
    color: 'bg-cyan-500 text-cyan-900',
  },
] as const;

export const transactionTypes: {
  name: 'income' | 'expenses';
  icon: IconName;
}[] = [
  { name: 'income', icon: 'income' },
  { name: 'expenses', icon: 'loan' },
] as const;

export const transactionStatus = {
  CANCELED: 'CANCELED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
} as const;

export const currency = [
  { local: 'eng', currency: 'UAH' },
  { local: 'eng', currency: 'USD' },
  { local: 'eng', currency: 'EUR' },
  { local: 'eng', currency: 'PLN' },
  { local: 'eng', currency: 'HUF' },
  { local: 'eng', currency: 'GBP' },
] as const;

export const transactionSortOptions = [
  { name: 'Transaction Name', label: 'name' },
  { name: 'Category', label: 'category' },
  { name: 'Account', label: 'account' },
  { name: 'Date & Time', label: 'date' },
  { name: 'Amount', label: 'amount' },
  { name: 'Note', label: 'note' },
  { name: 'Status', label: 'status' },
] as const;

export const TRANSACTION_SORT_FIELD_MAP = {
  name: 'transactionName',
  account: 'paymentMethod',
  date: 'createdAt',
  amount: 'amount',
  note: 'description',
  status: 'status',
  category: 'transactionCategory',
} as const;

// Radio
export const transactionTypesOptions = [
  { label: 'Income', value: 'income' },
  { label: 'Expenses', value: 'expenses' },
] as const;

export const ERROR_MESSAGES = {
  auth: {
    code: 401,
    header: 'Access denied',
    message:
      "You don't have permission to view this page. Please log in and try again.",
  },
  route: {
    code: 404,
    header: 'Page not found',
    message:
      "The page you're looking for doesn't exist or may have been moved.",
  },
  server: {
    code: 500,
    header: 'Something went wrong',
    message: "We're having trouble loading this page. Please try again later.",
  },
} as const;

export const MODAL_CONFIG = {
  footer: {
    create: {
      infoColor: 'text-slate-600',
      infoIcon: 'info',
      infoText: 'Fields marked * are required',
      buttonIcon: 'plus',
      buttonColor: 'blue',
      buttonText: 'Create',
    },
    edit: {
      infoColor: 'text-slate-500',
      infoIcon: 'undo',
      infoText: 'Editable from history',
      buttonIcon: 'check',
      buttonColor: 'blue',
      buttonText: 'Save changes',
    },
    delete: {
      infoColor: 'text-red-600',
      infoIcon: 'error',
      infoText: 'Cannot be undone',
      buttonIcon: 'delete',
      buttonColor: 'red',
      buttonText: 'Delete',
    },
  },
} as const;
