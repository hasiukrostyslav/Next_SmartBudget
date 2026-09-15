'use client';

import { useSyncExternalStore } from 'react';

import { FORMAT_LOCALE, UI_LOCALE } from '@/lib/constants/constants';

function subscribe(onTick: () => void) {
  const interval = setInterval(onTick, 1000);
  return () => clearInterval(interval);
}

// Whole seconds: the same number for a whole second, so React re-renders only
// when the displayed time changes. null on the server and during hydration, so
// the clock renders in the browser only (the server's time would be wrong).
const getSeconds = () => Math.floor(Date.now() / 1000);
const getServerSeconds = () => null;

export default function Time() {
  const seconds = useSyncExternalStore<number | null>(
    subscribe,
    getSeconds,
    getServerSeconds,
  );

  if (seconds === null) return null;

  const date = new Date(seconds * 1000);

  const formatDate = new Intl.DateTimeFormat(UI_LOCALE, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

  const formatTime = new Intl.DateTimeFormat(FORMAT_LOCALE, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);

  return (
    <div className="hidden gap-2 md:flex">
      <span className="text-sm text-slate-400">{formatDate}</span>
      <span className="text-sm text-slate-400">{formatTime}</span>
    </div>
  );
}
