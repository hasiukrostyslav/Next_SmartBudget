import { describe, expect, it } from 'vitest';

import { TRANSACTION_FILTERS } from '@/lib/constants/navigation';
import { hasActiveFilters } from '@/lib/utils/utils';

import { SearchParamsSchema } from './transaction.schema';

describe('list filter params', () => {
  it('accepts repeated and comma-separated values, without duplicates', () => {
    expect(
      SearchParamsSchema.parse({ status: ['PENDING', 'FAILED,PENDING'] })
        .status,
    ).toEqual(['PENDING', 'FAILED']);
  });

  it('drops values outside the allowed set', () => {
    const parsed = SearchParamsSchema.parse({
      category: ['cafe', 'bogus', 'currency exchange'],
      account: 'Cash,Crypto',
      currency: 'BTC',
    });
    expect(parsed.category).toEqual(['cafe']);
    expect(parsed.account).toEqual(['Cash']);
    expect(parsed.currency).toEqual([]);
  });

  it('defaults every list filter to an empty list', () => {
    expect(SearchParamsSchema.parse({})).toMatchObject({
      category: [],
      account: [],
      currency: [],
      status: [],
      type: [],
    });
  });
});

describe('hasActiveFilters', () => {
  it('is false for a query with no filters', () => {
    expect(
      hasActiveFilters(SearchParamsSchema.parse({}), TRANSACTION_FILTERS),
    ).toBe(false);
  });

  it('is true when a list filter or the search is set', () => {
    expect(
      hasActiveFilters(
        SearchParamsSchema.parse({ type: 'Income' }),
        TRANSACTION_FILTERS,
      ),
    ).toBe(true);
    expect(
      hasActiveFilters(
        SearchParamsSchema.parse({ search: 'taxi' }),
        TRANSACTION_FILTERS,
      ),
    ).toBe(true);
  });

  it('ignores a filter whose only values were invalid', () => {
    expect(
      hasActiveFilters(
        SearchParamsSchema.parse({ status: 'STOLEN' }),
        TRANSACTION_FILTERS,
      ),
    ).toBe(false);
  });
});
