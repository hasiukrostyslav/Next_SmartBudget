import { authRoutes, DEFAULT_LOGIN_PATH } from '../../routes';

const PLACEHOLDER_ORIGIN = 'http://placeholder.invalid';

// Where to go after sign-in. Only a path on this site is kept: an absolute URL,
// or "//host" and "/\\host" (which browsers read as another host), would turn
// the login page into an open redirect. Anything else, including a sign-in
// page that would loop, falls back to the dashboard.
export function safeCallbackPath(value: string | null | undefined): string {
  if (!value?.startsWith('/')) return DEFAULT_LOGIN_PATH;

  let url: URL;
  try {
    url = new URL(value, PLACEHOLDER_ORIGIN);
  } catch {
    return DEFAULT_LOGIN_PATH;
  }

  // The URL parser follows the browser's rules (it drops tabs and newlines and
  // reads a backslash as "/"), so a path that would leave the site shows here.
  if (url.origin !== PLACEHOLDER_ORIGIN) return DEFAULT_LOGIN_PATH;
  // Dot segments are resolved by now, so "/.//evil.example" has become
  // "//evil.example": protocol-relative, and another host as soon as a browser
  // or new URL(path, base) reads it.
  if (url.pathname.startsWith('//')) return DEFAULT_LOGIN_PATH;
  if (authRoutes.includes(url.pathname)) return DEFAULT_LOGIN_PATH;

  return `${url.pathname}${url.search}${url.hash}`;
}
