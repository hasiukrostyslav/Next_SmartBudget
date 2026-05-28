import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import authConfig from './auth/auth.config';
import {
  API_AUTH_PATH,
  authRoutes,
  DEFAULT_LOGIN_PATH,
  LOGIN_PATH,
} from './routes';

const { auth } = NextAuth(authConfig);

export default auth(async function proxy(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PATH);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isBaseRoute = nextUrl.pathname === '/';

  if (isApiAuthRoute) return NextResponse.next();

  if ((isAuthRoute && isLoggedIn) || (isLoggedIn && isBaseRoute)) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_PATH, nextUrl));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return NextResponse.redirect(new URL(LOGIN_PATH, nextUrl));
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
