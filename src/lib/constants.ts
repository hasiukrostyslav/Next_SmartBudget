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

export const saltRounds = 10;

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
