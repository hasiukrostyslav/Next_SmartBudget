import { TransactionItem } from '@/types/types';

import {
  DEFAULT_LOCALE,
  PAGE_SIZE_OPTIONS,
  PAGINATION_RANGE,
} from '../constants/constants';

// Check if any of the given filter keys has a truthy value. Accepts a plain
// object (server-parsed params) or a Record built from URLSearchParams, so
// server and client can check the same TRANSACTION_FILTERS list without
// hardcoding individual param names.
export function hasActiveFilters(
  params: Record<string, unknown> | undefined,
  filterKeys: readonly string[],
) {
  if (!params) return false;
  return filterKeys.some((key) => Boolean(params[key]));
}

// Generate Search Params string
export function createQueryString(
  searchParams: URLSearchParams,
  query: {
    param: string;
    value: string | number;
  }[],
) {
  const slugQuery = query.map((q) => ({ ...q, value: toSlug(q.value) }));

  const params = new URLSearchParams(searchParams.toString());
  slugQuery.forEach((el) =>
    el.value === '' ? params.delete(el.param) : params.set(el.param, el.value),
  );

  if (query.find((q) => q.param !== 'page')) params.set('page', '1');

  // Canonical order so the generated string is identical on server and client
  // (URL param order from useSearchParams is not stable across SSR/hydration).
  params.sort();

  return params.toString();
}

// Convert Search Params value with ' ' to -
export function toSlug(value: string | number) {
  if (typeof value === 'number') return String(value);
  return value.toLowerCase().replace(/\s+/g, '-');
}

// Convert Search Params value with - to ' '
export function fromSlug(slug: string | number) {
  if (typeof slug === 'number') return slug;
  return slug.replace(/-/g, ' ');
}

// Select filter options for list size
export function getPageSizeOption(totalCount: number) {
  const options = [...PAGE_SIZE_OPTIONS].map((num) => ({
    value: num,
    label: String(num),
  }));
  const index = options.findIndex((count) => count.value > totalCount);

  if (index === -1) return options;

  return options.slice(0, index + 1);
}

// Generate pagination buttons pattern
export function getPaginationPattern(
  count: number,
  index: number,
  currentPage: number,
) {
  const boundary = Math.ceil(PAGINATION_RANGE / 2);

  if (count <= PAGINATION_RANGE) return index + 1;
  if (count > PAGINATION_RANGE) {
    if (currentPage <= boundary) {
      return index < boundary ? index + 1 : index === boundary ? null : count;
    }
    if (currentPage >= count - boundary + 1) {
      return index === 0
        ? 1
        : index === 1
          ? null
          : count - boundary + index - 1;
    }

    return index === 0
      ? 1
      : index === PAGINATION_RANGE - 1
        ? count
        : index === boundary - 1
          ? currentPage
          : null;
  }
}

// For testing purpose
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Calculate sum of deleted balance
export function calcDeletedBalance(item: TransactionItem[]) {
  const grouped = Object.entries(
    Object.groupBy(item, ({ currency }) => currency),
  );

  return grouped.map(([currency, entries]) => {
    return {
      currency,
      total: (entries ?? []).reduce(
        (sum, item) =>
          sum +
          (item.transactionType === 'Income' ? item.amount : -item.amount),
        0,
      ),
    };
  });
}

// Format amount
export function getFormattedAmount(amount: number) {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    minimumFractionDigits: 2,
  }).format(amount);
}
