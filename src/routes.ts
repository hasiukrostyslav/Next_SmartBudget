/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged users to /dashboard.
 */
export const authRoutes = [
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
];

/**
 * The API authentication routes.
 * Routes that are user for API authentication purposes
 */
export const apiRoute = '/api/auth';

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
