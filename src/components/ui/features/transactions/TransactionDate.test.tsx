import { renderToString } from 'react-dom/server';

import { describe, expect, it } from 'vitest';

import TransactionDate, { formatTransactionDate } from './TransactionDate';

// 23:30 UTC on 1 January is already 2 January in Kyiv.
const date = new Date('2026-01-01T23:30:00Z');

describe('TransactionDate', () => {
  it('formats in the requested zone', () => {
    expect(formatTransactionDate(date, 'UTC')).toEqual({
      date: '01.01.2026',
      time: '23:30:00',
    });
    expect(formatTransactionDate(date, 'Europe/Kyiv')).toEqual({
      date: '02.01.2026',
      time: '01:30:00',
    });
  });

  it('renders the server HTML in the app time zone, whatever the host zone', () => {
    const html = renderToString(<TransactionDate date={date} withTime />);
    expect(html).toContain('02.01.2026');
    expect(html).toContain('01:30:00');
  });
});
