export const METADATA_TEXT = {
  GLOBAL: {
    template: '%s | SmartBudget',
    title: 'Welcome | SmartBudget',
    description: 'Smart Money, Bright Tomorrow',
  },
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Sign Up',
  NOT_FOUND_PAGE: 'Page not Found',
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized. Please sign in!',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  NETWORK: 'Could not reach the server. Check your connection and try again.',
  auth: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMAIL_EXISTS: 'An account with this email already exists.',
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password!',
    TOO_MANY_ATTEMPTS: 'Too many attempts. Wait a few minutes and try again.',
  },
  transaction: {
    FETCH_MANY: 'Failed to fetch transactions',
    FETCH_ONE: 'Failed to fetch transaction',
    NOT_FOUND: 'Transaction not found',
    INVALID: 'Some of the submitted values are invalid.',
    CREATE: 'Failed to create transaction',
    UPDATE: 'Failed to update transaction',
    UPDATE_STATUS: 'Failed to update transaction status',
    UPDATE_CATEGORY: 'Failed to update transaction category',
    DELETE: 'Failed to delete transaction',
    DELETE_MANY: 'Failed to delete transactions',
  },
} as const;

export const INPUT_PLACEHOLDER = {
  email: 'Please enter your email',
  password: 'Please enter your password',
  name: 'Please enter your full name',
  search: 'Search',
} as const;

export const EMPTY_STATE_TEXT = {
  transactions: {
    header: 'No transactions yet',
    description:
      "When you add or import transactions, they'll show up here so you can search, filter and categorize them.",
    cta: {
      primaryLabel: 'Add transaction',
    },
    noFilterResults: {
      header: 'No transactions match your filters',
      description:
        'No transactions match your search or filters. Try different keywords, or clear filters to see all transactions.',
    },
  },
  payments: {
    header: 'No payments yet',
    description:
      'Track recurring bills, subscriptions and one-time payments all in one place.',
    noFilterResults: {
      header: 'No payments match your filters',
      description:
        'No payments match your search or filters. Try different keywords, or clear filters to see all payments.',
    },
  },
  cards: {
    header: 'No cards added',
    description:
      'Add your debit or credit cards to monitor balances and link transactions automatically.',
    noFilterResults: {
      header: 'No cards match your filters',
      description:
        'No cards match your filters. Try clearing filters to see all your cards.',
    },
  },
  savings: {
    header: 'No savings goals yet',
    description:
      'Create a savings goal to start tracking your progress toward something that matters.',
    noFilterResults: {
      header: 'No savings match your filters',
      description:
        'No savings goals match your filters. Try clearing filters to see all your goals.',
    },
  },
  loans: {
    header: 'No loans tracked',
    description:
      'Add a loan to monitor your outstanding balance, interest, and repayment schedule.',
    noFilterResults: {
      header: 'No loans match your filters',
      description:
        'No loans match your filters. Try clearing filters to see all your loans.',
    },
  },
  deposits: {
    header: 'No deposits yet',
    description:
      'Record fixed deposits or term savings to keep tabs on maturity dates and earned interest.',
    noFilterResults: {
      header: 'No deposits match your filters',
      description:
        'No deposits match your filters. Try clearing filters to see all your deposits.',
    },
  },
  dashboard: {
    header: 'Your dashboard is empty',
    description:
      'Add a transaction, card, or savings goal to start seeing your financial overview here.',
    cta: {
      primaryLabel: 'Add transaction',
    },
    noFilterResults: {
      header: 'No dashboard match your filters',
      description:
        'Nothing on your dashboard matches your filters. Try clearing filters to see everything.',
    },
  },
} as const;
