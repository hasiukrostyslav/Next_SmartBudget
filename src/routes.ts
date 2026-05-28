/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 */
export const publicRoutes = ['/'];

export const LOGIN_PATH = '/auth/login';
export const SIGN_UP_PATH = '/auth/signup';
export const FORGOT_PASSWORD_PATH = '/auth/forgot-password';

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged users to /dashboard.
 */
export const authRoutes = [LOGIN_PATH, SIGN_UP_PATH, FORGOT_PASSWORD_PATH];

/**
 * The prefix for API authentication routes.
 */
export const API_AUTH_PATH = '/api/auth';

/**
 * The default redirect path after logging in.
 */
export const DEFAULT_LOGIN_PATH = '/dashboard';

export const TRANSACTIONS_PATH = '/dashboard/transactions';
