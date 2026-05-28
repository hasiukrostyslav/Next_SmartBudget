export const METADATA_TEXT = {
  GLOBAL: {
    template: '%s | SmartBudget',
    title: 'Welcome | SmartBudget',
    description: 'Smart Money, Bright Tomorrow',
  },
  FORGOT_PASSWORD: 'Forgot Password',
  SIGN_IN: 'Sign In',
  SIGN_UP: 'Sign Up',
  NOT_FOUND_PAGE: 'Page not Found',
} as const;

export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized. Please sign in!',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  auth: {
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMAIL_EXISTS: 'An account with this email already exists.',
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password!',
  },
  transaction: {
    FETCH_MANY: 'Failed to fetch transactions',
    FETCH_ONE: 'Failed to fetch transaction',
    NOT_FOUND: 'Transaction not found',
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
