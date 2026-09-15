import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import authConfig from './auth/auth.config';
import { revalidateSessionToken } from './auth/session';
import { safeCallbackPath } from './lib/utils/callbackUrl';
import {
  API_AUTH_PATH,
  authRoutes,
  DEFAULT_LOGIN_PATH,
  LOGIN_PATH,
} from './routes';

// The account re-check runs here as well as in auth.ts. auth() in Server
// Components and Server Actions can't write cookies, so a refreshed token was
// dropped and the account was looked up on every call once five minutes had
// passed. For a deleted account the proxy kept re-issuing the old cookie.
// The proxy's response carries the refreshed or cleared cookie.
const { auth } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    jwt: ({ token }) => revalidateSessionToken(token),
  },
});

export default auth(async function proxy(req) {
  const { nextUrl } = req;
  // Check the session's content, not its presence: under a configuration
  // error Auth.js populates req.auth with an error object, and a truthiness
  // check would then treat every anonymous request as signed in
  // (GHSA-8fpg-xm3f-6cx3).
  const isLoggedIn = Boolean(req.auth?.user?.id);

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PATH);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isBaseRoute = nextUrl.pathname === '/';

  if (isApiAuthRoute) return NextResponse.next();

  if (isLoggedIn && isAuthRoute) {
    // Already signed in: go where the login link was going to send them.
    const destination = new URL(
      safeCallbackPath(nextUrl.searchParams.get('callbackUrl')),
      nextUrl,
    );
    // Never leave this origin, whatever the helper returns.
    return NextResponse.redirect(
      destination.origin === nextUrl.origin
        ? destination
        : new URL(DEFAULT_LOGIN_PATH, nextUrl),
    );
  }

  if (isLoggedIn && isBaseRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl));
  }

  if (!isLoggedIn && !isAuthRoute) {
    const loginUrl = new URL(LOGIN_PATH, nextUrl);
    // Come back here after signing in. "/" has no page of its own.
    if (!isBaseRoute)
      loginUrl.searchParams.set(
        'callbackUrl',
        `${nextUrl.pathname}${nextUrl.search}`,
      );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
