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

//
export const transactionsFilters = {
  filters: [
    {
      name: 'category',
      types: {
        income: [
          { name: 'Income', icon: '' },
          { name: 'Investments', icon: '' },
          { name: 'Prize', icon: '' },
        ],
        expenses: [
          { name: 'Advertisement', icon: '' },
          { name: 'Appliance', icon: '' },
          { name: 'Books', icon: '' },
          { name: 'Cafe and Restaurants', icon: '' },
          { name: 'Clothes', icon: '' },
          { name: 'Delivery', icon: '' },
          { name: 'Donations', icon: '' },
          { name: 'Entertainment', icon: '' },
          { name: 'Flowers', icon: '' },
          { name: 'Groceries', icon: '' },
          { name: 'Healthcare', icon: '' },
          { name: 'Insurance', icon: '' },
          { name: 'Loan', icon: '' },
          { name: 'Mobile Phone', icon: '' },
          { name: 'Movies', icon: '' },
          { name: 'Others', icon: '' },
          { name: 'Personal Care', icon: '' },
          { name: 'Pet Care', icon: '' },
          { name: 'Repair', icon: '' },
          { name: 'Sport', icon: '' },
          { name: 'Taxes', icon: '' },
          { name: 'Taxi', icon: '' },
          { name: 'Transfer', icon: '' },
          { name: 'Travel', icon: '' },
          { name: 'Utilities', icon: '' },
        ],
      },
    },
    {
      name: 'account',
      types: [{ name: 'Cash', icon: 'banknote' }],
    },
    {
      name: 'type',
      types: [
        { name: 'Income', icon: '' },
        { name: 'Expenses', icon: '' },
      ],
    },
  ],
};
