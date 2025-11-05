import { IconName, InputIcons } from '@/types/types';
import { Zoom, type ToastPosition } from 'react-toastify';

// Options for Toast Component
export const toastOptions = {
  position: 'top-center' as ToastPosition,
  autoClose: 3000,
  transition: Zoom,
  closeButton: false,
  hideProgressBar: true,
  className: '!bg-transparent !shadow-none !p-0 !m-0 !border-0',
};

// Auth input with icons types
export const inputIcons: InputIcons = {
  name: 'user',
  email: 'mail',
  password: 'lock',
};

// Salt for password hashing
export const saltRounds = 10;

// Navigation Link data
export const navLinks: {
  page: string;
  icon: IconName;
  type: 'main' | 'setting';
}[] = [
  {
    type: 'main',
    page: 'dashboard',
    icon: 'layout-grid',
  },
  { type: 'main', page: 'transactions', icon: 'arrow-left-right' },
  { type: 'main', page: 'payments', icon: 'credit-card' },
  { type: 'main', page: 'cards', icon: 'wallet-cards' },
  { type: 'main', page: 'savings', icon: 'piggy-bank' },
  { type: 'main', page: 'loans', icon: 'percent' },
  { type: 'main', page: 'deposits', icon: 'banknote-arrow-up' },
  { type: 'setting', page: 'profile', icon: 'user' },
  { type: 'setting', page: 'settings', icon: 'settings' },
];

const category = {
  income: [
    { name: 'Income', icon: 'banknote-arrow-up' },
    { name: 'Investments', icon: 'chart-line' },
    { name: 'Prize', icon: 'trophy' },
  ],
  expenses: [
    { name: 'Advertisement', icon: 'megaphone' },
    { name: 'Appliance', icon: 'washing-machine' },
    { name: 'Books', icon: 'book-open-text' },
    { name: 'Cafe', icon: 'utensils' },
    { name: 'Car', icon: 'car' },
    { name: 'Clothes', icon: 'shirt' },
    { name: 'Delivery', icon: 'truck' },
    { name: 'Donations', icon: 'hand-heart' },
    { name: 'Entertainment', icon: 'gamepad-2' },
    { name: 'Flowers', icon: 'flower' },
    { name: 'Groceries', icon: 'apple' },
    { name: 'Healthcare', icon: 'heart' },
    { name: 'Insurance', icon: 'umbrella' },
    { name: 'Internet', icon: 'globe' },
    { name: 'Loan', icon: 'banknote-arrow-down' },
    { name: 'Mobile Phone', icon: 'smartphone' },
    { name: 'Movies', icon: 'clapperboard' },
    { name: 'Others', icon: 'ellipsis' },
    { name: 'Personal Care', icon: 'scissors' },
    { name: 'Pet Care', icon: 'cat' },
    { name: 'Repair', icon: 'drill' },
    { name: 'Sport', icon: 'volleyball' },
    { name: 'Taxes', icon: 'landmark' },
    { name: 'Taxi', icon: 'car-taxi-front' },
    { name: 'Transfer', icon: 'arrow-left-right' },
    { name: 'Travel', icon: 'briefcase' },
    {
      name: 'Utilities',
      type: [
        {
          name: 'Utility',
          icon: 'house',
        },
        {
          name: 'Gas',
          icon: 'flame',
        },
        {
          name: 'Water',
          icon: 'droplet',
        },
        {
          name: 'Electricity',
          icon: 'zap',
        },
      ],
    },
  ],
};

export const transactionsFilters = {
  filters: [
    {
      name: 'category',
      types: [...category.income, ...category.expenses]
        .map((el) => el.name)
        .toSorted(),
    },
    {
      name: 'account',
      types: ['Cash'],
    },
    {
      name: 'type',
      types: ['Income', 'Expenses'],
    },
  ],
};
