import { describe, expect, it } from 'vitest';

import { createQueryString, matchesQuery } from './utils';

describe('matchesQuery', () => {
  it('matches any text, case-insensitively, and everything for an empty query', () => {
    expect(matchesQuery('', 'Cafe')).toBe(true);
    expect(matchesQuery('pet', 'Pet Care')).toBe(true);
    expect(matchesQuery('vet', 'Pet Care', 'Vet, food, grooming')).toBe(true);
    expect(matchesQuery('taxi', 'Pet Care', undefined)).toBe(false);
  });
});

describe('createQueryString', () => {
  it('returns to page 1 when anything but the page changes', () => {
    const params = new URLSearchParams('page=3&sort=date');
    expect(
      createQueryString(params, [{ param: 'sort', value: 'amount' }]),
    ).toBe('page=1&sort=amount');
  });

  it('keeps the requested page when only the page changes', () => {
    const params = new URLSearchParams('page=3&sort=date');
    expect(createQueryString(params, [{ param: 'page', value: 4 }])).toBe(
      'page=4&sort=date',
    );
  });
});
