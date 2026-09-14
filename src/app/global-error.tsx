'use client';

import { useEffect } from 'react';

import '@/styles/globals.css';

import { ERROR_MESSAGES_CONFIG } from '@/lib/constants/components';

// Last resort: replaces the root layout itself, so it renders its own <html>
// and depends on nothing the root layout provides (theme, toasts, tooltips).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const { header, message } = ERROR_MESSAGES_CONFIG.server;

  return (
    <html lang="en">
      <body className="flex h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center text-slate-900">
        <h1 className="text-3xl font-bold tracking-wider">{header}</h1>
        <p className="font-light">{message}</p>
        <button
          type="button"
          onClick={reset}
          className="outline-round-sm rounded-md bg-blue-600 px-4 py-2 text-slate-100 hover:bg-blue-700"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
