'use client';

import { useSyncExternalStore } from 'react';

import { clsx } from 'clsx';

import { DEFAULT_TIME_ZONE, FORMAT_LOCALE } from '@/lib/constants/constants';

interface TransactionDateProps {
  date: Date;
  withTime: boolean;
}

export function formatTransactionDate(date: Date, timeZone?: string) {
  return {
    date: new Intl.DateTimeFormat(FORMAT_LOCALE, { timeZone }).format(date),
    time: new Intl.DateTimeFormat(FORMAT_LOCALE, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone,
    }).format(date),
  };
}

const subscribe = () => () => {};

export default function TransactionDate({
  date,
  withTime,
}: TransactionDateProps) {
  // Formatting in "the local zone" meant the server's zone during SSR and the
  // browser's during hydration: a UTC host and a Kyiv user produced different
  // strings, a hydration mismatch, and a day off near midnight. The server and
  // the hydration pass both use DEFAULT_TIME_ZONE; once hydrated, the browser
  // re-renders in the user's own zone.
  const isHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const { date: formattedDate, time } = formatTransactionDate(
    date,
    isHydrated ? undefined : DEFAULT_TIME_ZONE,
  );

  return (
    <div className={clsx('flex flex-col', withTime ? 'px-1.5' : '')}>
      <span className="font-medium">{formattedDate}</span>
      {withTime && (
        <span className="text-slate-500 dark:text-slate-500">{time}</span>
      )}
    </div>
  );
}
