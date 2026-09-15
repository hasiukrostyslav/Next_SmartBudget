import { describe, expect, it } from 'vitest';

import { safeCallbackPath } from './callbackUrl';

describe('safeCallbackPath', () => {
  it('keeps a path on this site with its query', () => {
    expect(safeCallbackPath('/dashboard/transactions?page=2&sort=amount')).toBe(
      '/dashboard/transactions?page=2&sort=amount',
    );
  });

  it.each([
    undefined,
    null,
    '',
    'dashboard',
    'https://evil.example/',
    '//evil.example',
    '/\\evil.example',
    '/\t/evil.example',
    'javascript:alert(1)',
    '/auth/login',
    '/auth/signup?next=1',
  ])('falls back to the dashboard for %j', (value) => {
    expect(safeCallbackPath(value)).toBe('/dashboard');
  });
});
