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
    // Forms that pass the origin check and only become "//host" once the
    // parser resolves their dot segments.
    '/.//evil.example',
    '/dashboard/..//evil.example/login?x=1',
    '/%2e//evil.example',
    '/%2E%2E//evil.example',
    '/.\\/evil.example',
    'javascript:alert(1)',
    '/auth/login',
    '/auth/signup?next=1',
  ])('falls back to the dashboard for %j', (value) => {
    expect(safeCallbackPath(value)).toBe('/dashboard');
  });

  it('returns a value that passes its own check unchanged', () => {
    for (const value of [
      '/dashboard/transactions?page=2',
      '/.//evil.example',
      '/dashboard/..//evil.example',
      '/a/../b?c=1#d',
    ]) {
      const safe = safeCallbackPath(value);
      expect(safe.startsWith('//')).toBe(false);
      expect(safeCallbackPath(safe)).toBe(safe);
    }
  });
});
