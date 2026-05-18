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

export const transactionTypes: {
  name: 'income' | 'expenses';
  icon: IconName;
}[] = [
  { name: 'income', icon: 'income' },
  { name: 'expenses', icon: 'loan' },
] as const;

export const transactionStatus = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
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

export const BUTTON_STYLES = {
  color: {
    black: `border-slate-900 bg-slate-900 hover:border-slate-800 
    hover:bg-slate-800 dark:border-blue-600 dark:bg-blue-600 
    dark:hover:border-blue-500 dark:hover:bg-blue-500`,
    blue: `border-blue-600 text-slate-100 bg-blue-600 
    hover:border-blue-700 hover:bg-blue-700
    dark:bg-blue-800 dark:border-blue-800 dark:hover:bg-blue-900 dark:hover:border-blue-900`,
    red: `border-red-600 bg-red-600 text-slate-100  
    hover:bg-red-700 hover:border-red-700
    dark:bg-red-700 dark:border-red-700 dark:hover:bg-red-800 dark:hover:border-red-800`,
    transparent: `text-slate-600 border-transparent dark:text-slate-400`,
    outline: `border-slate-600 text-slate-600 dark:border-slate-400 
    hover:bg-slate-100 dark:text-slate-400 
    focus:border-transparent dark:hover:bg-slate-800`,
  },
  size: {
    xs: 'outline-round-sm px-2 ',
    sm: 'outline-round-sm px-2 py-1',
    md: 'outline-round-sm px-2 py-1.5',
    lg: 'outline-round-md px-3 py-2.5',
  },
} as const;

export const MODAL_CONFIG = {
  header: {
    create: {
      icon: 'plus',
      iconColor: 'text-blue-500',
      iconBgColor: 'bg-blue-100 dark:bg-blue-500/20',
      header: 'Add new',
      infoText: 'Enter an income or expense record',
    },
    editStatus: {
      icon: 'refresh',
      iconColor: 'text-blue-500',
      iconBgColor: 'bg-blue-100 dark:bg-blue-500/20',
      header: 'Change status',
      infoText: 'Update what happened with this transaction',
    },
    editCategory: {
      icon: 'tag',
      iconColor: 'text-purple-500',
      iconBgColor: 'bg-purple-200 dark:bg-purple-500/20',
      header: 'Change category',
      infoText: 'Re-categorize what these transactions are for',
    },
    delete: {
      icon: 'delete',
      iconColor: 'text-red-500',
      iconBgColor: 'bg-red-200 dark:bg-red-500/10',
      header: 'Delete',
      infoText: 'This action cannot be undone',
    },
  },
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

export const STATUS_CONFIG = {
  COMPLETED: {
    description: 'Payment processed successfully',
    header: 'Completed',
    icon: 'circle-check',
    style: {
      badge: `bg-green-700 text-slate-100 border-green-700 
      dark:bg-green-700/10 dark:text-green-500`,
      card: 'border-green-600 bg-green-50 dark:bg-green-600/10',
      icon: 'bg-green-200 text-green-600 dark:bg-green-500/20',
      radio: 'border-green-600',
    },
  },
  PENDING: {
    description: 'Waiting for payment to settle',
    header: 'Pending',
    icon: 'clock',
    style: {
      badge: `bg-yellow-300 border-yellow-300 text-slate-700 
      dark:text-yellow-500 dark:border-yellow-500 dark:bg-yellow-500/10`,
      card: 'border-yellow-600 bg-yellow-50 dark:bg-yellow-600/10',
      icon: 'bg-yellow-200 text-yellow-600 dark:bg-yellow-500/20',
      radio: 'border-yellow-600',
    },
  },
  FAILED: {
    description: 'Transaction did not go through',
    header: 'Failed',
    icon: 'circle-x',
    style: {
      badge: `bg-red-500 text-slate-100 border-red-500 
      dark:bg-red-500/10 dark:text-red-500`,
      card: 'border-red-600 bg-red-50 dark:bg-red-600/10',
      icon: 'bg-red-200 text-red-600 dark:bg-red-500/20',
      radio: 'border-red-600',
    },
  },
  CANCELED: {
    description: 'Manually cancelled by the user',
    header: 'Canceled',
    icon: 'circle-minus',
    style: {
      badge: `bg-slate-500 text-slate-100 border-slate-500 
      dark:bg-slate-500/10 dark:text-slate-400`,
      card: 'border-slate-600 bg-slate-50 dark:bg-slate-600/10',
      icon: 'bg-slate-200 text-slate-600 dark:bg-slate-500/20',
      radio: 'border-slate-600',
    },
  },
} as const;

export const TRANSACTION_CATEGORIES = {
  income: {
    header: 'Income',
    icon: 'income',
    style: {
      badge: `bg-emerald-100 text-emerald-700 border-emerald-200
        dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40`,
      card: 'border-emerald-400 bg-emerald-50 dark:bg-emerald-600/10',
      icon: 'bg-emerald-200 text-emerald-600 dark:bg-emerald-500/20',
      radio: 'border-emerald-400',
    },
    description: 'Salary, wages, freelance',
  },
  investments: {
    header: 'Investments',
    icon: 'investments',
    style: {
      badge: `bg-blue-100 text-blue-700 border-blue-300
        dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40`,
      card: 'border-blue-500 bg-blue-50 dark:bg-blue-600/10',
      icon: 'bg-blue-200 text-blue-600 dark:bg-blue-500/20',
      radio: 'border-blue-500',
    },
    description: 'Stocks, bonds, dividends',
  },
  prize: {
    header: 'Prize',
    icon: 'prize',
    style: {
      badge: `bg-yellow-100 text-yellow-700 border-yellow-200
        dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/40`,
      card: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-600/10',
      icon: 'bg-yellow-200 text-yellow-600 dark:bg-yellow-500/20',
      radio: 'border-yellow-400',
    },
    description: 'Lottery, contests, gifts',
  },
  currency_exchange: {
    header: 'Currency Exchange',
    icon: 'currency-exchange',
    style: {
      badge: `bg-amber-100 text-amber-700 border-amber-200
        dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40`,
      card: 'border-amber-400 bg-amber-50 dark:bg-amber-600/10',
      icon: 'bg-amber-200 text-amber-600 dark:bg-amber-500/20',
      radio: 'border-amber-400',
    },
    description: 'Forex, crypto, exchange',
  },
  advertisement: {
    header: 'Advertisement',
    icon: 'advertisement',
    style: {
      badge: `bg-orange-100 text-orange-700 border-orange-200
        dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/40`,
      card: 'border-orange-400 bg-orange-50 dark:bg-orange-600/10',
      icon: 'bg-orange-200 text-orange-600 dark:bg-orange-500/20',
      radio: 'border-orange-400',
    },
    description: 'Promotions, ads, marketing',
  },
  appliance: {
    header: 'Appliance',
    icon: 'appliance',
    style: {
      badge: `bg-cyan-100 text-cyan-700 border-cyan-300
        dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/40`,
      card: 'border-cyan-500 bg-cyan-50 dark:bg-cyan-600/10',
      icon: 'bg-cyan-200 text-cyan-600 dark:bg-cyan-500/20',
      radio: 'border-cyan-500',
    },
    description: 'Home devices, electronics',
  },
  books: {
    header: 'Books',
    icon: 'books',
    style: {
      badge: `bg-indigo-100 text-indigo-700 border-indigo-300
        dark:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/40`,
      card: 'border-indigo-500 bg-indigo-50 dark:bg-indigo-600/10',
      icon: 'bg-indigo-200 text-indigo-600 dark:bg-indigo-500/20',
      radio: 'border-indigo-500',
    },
    description: 'Books, e-books, magazines',
  },
  cafe: {
    header: 'Cafe',
    icon: 'cafe',
    style: {
      badge: `bg-rose-100 text-rose-700 border-rose-200
        dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/40`,
      card: 'border-rose-400 bg-rose-50 dark:bg-rose-600/10',
      icon: 'bg-rose-200 text-rose-600 dark:bg-rose-500/20',
      radio: 'border-rose-400',
    },
    description: 'Coffee, snacks, cafes',
  },
  car: {
    header: 'Car',
    icon: 'car',
    style: {
      badge: `bg-sky-100 text-sky-700 border-sky-300
        dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/40`,
      card: 'border-sky-500 bg-sky-50 dark:bg-sky-600/10',
      icon: 'bg-sky-200 text-sky-600 dark:bg-sky-500/20',
      radio: 'border-sky-500',
    },
    description: 'Car payments, maintenance',
  },
  clothes: {
    header: 'Clothes',
    icon: 'clothes',
    style: {
      badge: `bg-pink-100 text-pink-700 border-pink-200
        dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/40`,
      card: 'border-pink-400 bg-pink-50 dark:bg-pink-600/10',
      icon: 'bg-pink-200 text-pink-600 dark:bg-pink-500/20',
      radio: 'border-pink-400',
    },
    description: 'Clothing, shoes, accessories',
  },
  delivery: {
    header: 'Delivery',
    icon: 'delivery',
    style: {
      badge: `bg-teal-100 text-teal-700 border-teal-200
        dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/40`,
      card: 'border-teal-400 bg-teal-50 dark:bg-teal-600/10',
      icon: 'bg-teal-200 text-teal-600 dark:bg-teal-500/20',
      radio: 'border-teal-400',
    },
    description: 'Courier, shipping, postal',
  },
  donations: {
    header: 'Donations',
    icon: 'donations',
    style: {
      badge: `bg-violet-100 text-violet-700 border-violet-200
        dark:bg-violet-500/20 dark:text-violet-400 dark:border-violet-500/40`,
      card: 'border-violet-400 bg-violet-50 dark:bg-violet-600/10',
      icon: 'bg-violet-200 text-violet-600 dark:bg-violet-500/20',
      radio: 'border-violet-400',
    },
    description: 'Charity, donations, tips',
  },
  electricity: {
    header: 'Electricity',
    icon: 'electricity',
    style: {
      badge: `bg-lime-100 text-lime-700 border-lime-200
        dark:bg-lime-500/20 dark:text-lime-400 dark:border-lime-500/40`,
      card: 'border-lime-400 bg-lime-50 dark:bg-lime-600/10',
      icon: 'bg-lime-200 text-lime-600 dark:bg-lime-500/20',
      radio: 'border-lime-400',
    },
    description: 'Power bills, energy',
  },
  entertainment: {
    header: 'Entertainment',
    icon: 'entertainment',
    style: {
      badge: `bg-purple-100 text-purple-700 border-purple-200
        dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/40`,
      card: 'border-purple-400 bg-purple-50 dark:bg-purple-600/10',
      icon: 'bg-purple-200 text-purple-600 dark:bg-purple-500/20',
      radio: 'border-purple-400',
    },
    description: 'Events, games, hobbies',
  },
  flowers: {
    header: 'Flowers',
    icon: 'flowers',
    style: {
      badge: `bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200
        dark:bg-fuchsia-500/20 dark:text-fuchsia-400 dark:border-fuchsia-500/40`,
      card: 'border-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-600/10',
      icon: 'bg-fuchsia-200 text-fuchsia-600 dark:bg-fuchsia-500/20',
      radio: 'border-fuchsia-400',
    },
    description: 'Flowers, plants, gifts',
  },
  gas: {
    header: 'Gas',
    icon: 'gas',
    style: {
      badge: `bg-red-100 text-red-700 border-red-200
        dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/40`,
      card: 'border-red-400 bg-red-50 dark:bg-red-600/10',
      icon: 'bg-red-200 text-red-600 dark:bg-red-500/20',
      radio: 'border-red-400',
    },
    description: 'Fuel, gas station',
  },
  groceries: {
    header: 'Groceries',
    icon: 'groceries',
    style: {
      badge: `bg-green-100 text-green-700 border-green-200
        dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/40`,
      card: 'border-green-400 bg-green-50 dark:bg-green-600/10',
      icon: 'bg-green-200 text-green-600 dark:bg-green-500/20',
      radio: 'border-green-400',
    },
    description: 'Food and household',
  },
  healthcare: {
    header: 'Healthcare',
    icon: 'healthcare',
    style: {
      badge: `bg-emerald-100 text-emerald-700 border-emerald-300
        dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/40`,
      card: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-600/10',
      icon: 'bg-emerald-200 text-emerald-600 dark:bg-emerald-500/20',
      radio: 'border-emerald-500',
    },
    description: 'Doctor, medicine, clinic',
  },
  insurance: {
    header: 'Insurance',
    icon: 'insurance',
    style: {
      badge: `bg-blue-100 text-blue-700 border-blue-300
        dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/40`,
      card: 'border-blue-600 bg-blue-50 dark:bg-blue-600/10',
      icon: 'bg-blue-200 text-blue-600 dark:bg-blue-500/20',
      radio: 'border-blue-600',
    },
    description: 'Health, car, home insurance',
  },
  internet: {
    header: 'Internet',
    icon: 'internet',
    style: {
      badge: `bg-cyan-100 text-cyan-700 border-cyan-300
        dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/40`,
      card: 'border-cyan-600 bg-cyan-50 dark:bg-cyan-600/10',
      icon: 'bg-cyan-200 text-cyan-600 dark:bg-cyan-500/20',
      radio: 'border-cyan-600',
    },
    description: 'Internet, cable, streaming',
  },
  jewelry: {
    header: 'Jewelry',
    icon: 'jewelry',
    style: {
      badge: `bg-yellow-100 text-yellow-700 border-yellow-300
        dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/40`,
      card: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-600/10',
      icon: 'bg-yellow-200 text-yellow-600 dark:bg-yellow-500/20',
      radio: 'border-yellow-500',
    },
    description: 'Jewelry, watches, luxury',
  },
  loan: {
    header: 'Loan',
    icon: 'loan',
    style: {
      badge: `bg-red-100 text-red-700 border-red-300
        dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/40`,
      card: 'border-red-500 bg-red-50 dark:bg-red-600/10',
      icon: 'bg-red-200 text-red-600 dark:bg-red-500/20',
      radio: 'border-red-500',
    },
    description: 'Loan payments, debt',
  },
  mobile_phone: {
    header: 'Mobile Phone',
    icon: 'mobile-phone',
    style: {
      badge: `bg-indigo-100 text-indigo-700 border-indigo-300
        dark:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-500/40`,
      card: 'border-indigo-600 bg-indigo-50 dark:bg-indigo-600/10',
      icon: 'bg-indigo-200 text-indigo-600 dark:bg-indigo-500/20',
      radio: 'border-indigo-600',
    },
    description: 'Phone bills, subscriptions',
  },
  movies: {
    header: 'Movies',
    icon: 'movies',
    style: {
      badge: `bg-purple-100 text-purple-700 border-purple-300
        dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/40`,
      card: 'border-purple-500 bg-purple-50 dark:bg-purple-600/10',
      icon: 'bg-purple-200 text-purple-600 dark:bg-purple-500/20',
      radio: 'border-purple-500',
    },
    description: 'Cinema, streaming, shows',
  },
  others: {
    header: 'Others',
    icon: 'others',
    style: {
      badge: `bg-amber-100 text-amber-700 border-amber-300
        dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/40`,
      card: 'border-amber-500 bg-amber-50 dark:bg-amber-600/10',
      icon: 'bg-amber-200 text-amber-600 dark:bg-amber-500/20',
      radio: 'border-amber-500',
    },
    description: 'Miscellaneous expenses',
  },
  personal_care: {
    header: 'Personal Care',
    icon: 'personal-care',
    style: {
      badge: `bg-pink-100 text-pink-700 border-pink-300
        dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-500/40`,
      card: 'border-pink-500 bg-pink-50 dark:bg-pink-600/10',
      icon: 'bg-pink-200 text-pink-600 dark:bg-pink-500/20',
      radio: 'border-pink-500',
    },
    description: 'Haircut, beauty, hygiene',
  },
  pet_care: {
    header: 'Pet Care',
    icon: 'pet-care',
    style: {
      badge: `bg-orange-100 text-orange-700 border-orange-300
        dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/40`,
      card: 'border-orange-500 bg-orange-50 dark:bg-orange-600/10',
      icon: 'bg-orange-200 text-orange-600 dark:bg-orange-500/20',
      radio: 'border-orange-500',
    },
    description: 'Vet, food, grooming',
  },
  repair: {
    header: 'Repair',
    icon: 'repair',
    style: {
      badge: `bg-teal-100 text-teal-700 border-teal-300
        dark:bg-teal-500/20 dark:text-teal-400 dark:border-teal-500/40`,
      card: 'border-teal-500 bg-teal-50 dark:bg-teal-600/10',
      icon: 'bg-teal-200 text-teal-600 dark:bg-teal-500/20',
      radio: 'border-teal-500',
    },
    description: 'Home, car, appliance repair',
  },
  sport: {
    header: 'Sport',
    icon: 'sport',
    style: {
      badge: `bg-green-100 text-green-700 border-green-300
        dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/40`,
      card: 'border-green-500 bg-green-50 dark:bg-green-600/10',
      icon: 'bg-green-200 text-green-600 dark:bg-green-500/20',
      radio: 'border-green-500',
    },
    description: 'Gym, sports, fitness',
  },
  taxes: {
    header: 'Taxes',
    icon: 'taxes',
    style: {
      badge: `bg-rose-100 text-rose-700 border-rose-300
        dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/40`,
      card: 'border-rose-500 bg-rose-50 dark:bg-rose-600/10',
      icon: 'bg-rose-200 text-rose-600 dark:bg-rose-500/20',
      radio: 'border-rose-500',
    },
    description: 'Income, property, sales tax',
  },
  taxi: {
    header: 'Taxi',
    icon: 'taxi',
    style: {
      badge: `bg-sky-100 text-sky-700 border-sky-300
        dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/40`,
      card: 'border-sky-600 bg-sky-50 dark:bg-sky-600/10',
      icon: 'bg-sky-200 text-sky-600 dark:bg-sky-500/20',
      radio: 'border-sky-600',
    },
    description: 'Rides, taxis, ridesharing',
  },
  transfer: {
    header: 'Transfer',
    icon: 'transfer',
    style: {
      badge: `bg-violet-100 text-violet-700 border-violet-300
        dark:bg-violet-500/20 dark:text-violet-400 dark:border-violet-500/40`,
      card: 'border-violet-500 bg-violet-50 dark:bg-violet-600/10',
      icon: 'bg-violet-200 text-violet-600 dark:bg-violet-500/20',
      radio: 'border-violet-500',
    },
    description: 'Bank transfers, fees',
  },
  travel: {
    header: 'Travel',
    icon: 'travel',
    style: {
      badge: `bg-fuchsia-100 text-fuchsia-700 border-fuchsia-300
        dark:bg-fuchsia-500/20 dark:text-fuchsia-400 dark:border-fuchsia-500/40`,
      card: 'border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-600/10',
      icon: 'bg-fuchsia-200 text-fuchsia-600 dark:bg-fuchsia-500/20',
      radio: 'border-fuchsia-500',
    },
    description: 'Flights, hotels, travel',
  },
  utilities: {
    header: 'Utilities',
    icon: 'utility',
    style: {
      badge: `bg-lime-100 text-lime-700 border-lime-300
        dark:bg-lime-500/20 dark:text-lime-400 dark:border-lime-500/40`,
      card: 'border-lime-500 bg-lime-50 dark:bg-lime-600/10',
      icon: 'bg-lime-200 text-lime-600 dark:bg-lime-500/20',
      radio: 'border-lime-500',
    },
    description: 'Water, gas, utilities',
  },
  water: {
    header: 'Water',
    icon: 'water',
    style: {
      badge: `bg-cyan-100 text-cyan-700 border-cyan-300
        dark:bg-cyan-500/20 dark:text-cyan-400 dark:border-cyan-500/40`,
      card: 'border-cyan-700 bg-cyan-50 dark:bg-cyan-600/10',
      icon: 'bg-cyan-200 text-cyan-600 dark:bg-cyan-500/20',
      radio: 'border-cyan-700',
    },
    description: 'Water bills, plumbing',
  },
} as const;

export const INPUT_CONFIG = {
  padding: {
    xs: 'py-1',
    sm: 'py-1.5',
    md: 'py-2',
    lg: 'py-2.5',
  },
  border: {
    default: 'border-slate-300 dark:border-slate-500',
    error: 'border-red-300 dark:border-red-400',
    disabled: 'border-slate-200 dark:border-slate-500',
  },
  iconPadding: {
    xs: 'pl-8',
    sm: 'pl-8',
    md: 'pl-8',
    lg: 'pl-10',
  },
} as const;
