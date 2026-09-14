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
  const params = new URLSearchParams(searchParams.toString());
  query.forEach((el) =>
    el.value === ''
      ? params.delete(el.param)
      : params.set(el.param, String(el.value)),
  );

  if (query.find((q) => q.param !== 'page')) params.set('page', '1');

  // Canonical order so the generated string is identical on server and client
  // (URL param order from useSearchParams is not stable across SSR/hydration).
  params.sort();

  return params.toString();
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

// Balance impact of deleting these items, per currency. Summed in integer
// minor units: adding floats directly drifts (100.1 + 200.2 is
// 300.29999999999995 in JavaScript).
export function calcDeletedBalance(item: TransactionItem[]) {
  const grouped = Object.entries(
    Object.groupBy(item, ({ currency }) => currency),
  );

  return grouped.map(([currency, entries]) => {
    const minorUnits = (entries ?? []).reduce((sum, entry) => {
      const cents = Math.round(entry.amount * 100);
      return sum + (entry.transactionType === 'Income' ? cents : -cents);
    }, 0);

    return { currency, total: minorUnits / 100 };
  });
}

// Format amount
export function getFormattedAmount(amount: number) {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    minimumFractionDigits: 2,
  }).format(amount);
}
