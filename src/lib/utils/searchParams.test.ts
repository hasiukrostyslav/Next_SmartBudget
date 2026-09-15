import { describe, expect, it } from 'vitest';

import { SearchParamsSchema } from '@/lib/schemas/transaction.schema';

import { normaliseSearchParams, RawSearchParams } from './searchParams';

const parse = (raw: RawSearchParams) => SearchParamsSchema.parse(raw);

describe('SearchParamsSchema', () => {
  it.each<[RawSearchParams, Record<string, unknown>]>([
    [{ limit: 'abc' }, { limit: 10, page: 1 }],
    [{ page: '0' }, { page: 1 }],
    [{ page: '-3' }, { page: 1 }],
    [{ page: '2.5' }, { page: 1 }],
    [{ page: '1e20' }, { page: 1 }],
    [{ limit: '100000' }, { limit: 10 }],
    [{ limit: ['10', '25'] }, { limit: 10 }],
    [{ sort: 'bogus' }, { sort: 'date' }],
    [{ order: 'sideways' }, { order: 'desc' }],
  ])('falls back per field for %j', (raw, expected) => {
    expect(parse(raw)).toMatchObject(expected);
  });

  it('keeps every valid param when one is invalid', () => {
    expect(
      parse({ sort: 'bogus', order: 'asc', limit: '25', search: 'taxi' }),
    ).toMatchObject({ sort: 'date', order: 'asc', limit: 25, search: 'taxi' });
  });

  it('applies defaults to an empty query', () => {
    expect(parse({})).toMatchObject({
      limit: 10,
      page: 1,
      sort: 'date',
      order: 'desc',
      search: '',
    });
  });
});

describe('normaliseSearchParams', () => {
  it('returns null when the URL already matches what is rendered', () => {
    const raw = { limit: '25', page: '2', sort: 'amount', order: 'asc' };
    expect(normaliseSearchParams(raw, parse(raw))).toBeNull();
  });

  it('does not add params that were absent', () => {
    const raw = { search: 'x' };
    expect(normaliseSearchParams(raw, parse(raw))).toBeNull();
  });

  it('rewrites invalid values and keeps the rest of the query', () => {
    const raw = {
      page: 'abc',
      limit: '100000',
      search: 'car',
      category: ['cafe', 'taxi'],
    };
    expect(normaliseSearchParams(raw, parse(raw))?.toString()).toBe(
      'category=cafe&category=taxi&limit=10&page=1&search=car',
    );
  });

  it('collapses a repeated param to the value rendered', () => {
    const raw = { sort: ['amount', 'name'] };
    expect(normaliseSearchParams(raw, parse(raw))?.toString()).toBe(
      'sort=date',
    );
  });
});
