import { pageSizeOptions, paginationRange } from '../constants/constants';

// Generate Search Params string
export function createQueryString(
  searchParams: URLSearchParams,
  name: string,
  value: string | number,
) {
  const slugValue = toSlug(value);

  const params = new URLSearchParams(searchParams.toString());
  params.set(name, slugValue);
  if (name !== 'page') params.set('page', '1');

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
  const options = [...pageSizeOptions];
  const index = options.findIndex((count) => count > totalCount);

  if (index === -1) return options;

  return options.slice(0, index + 1);
}

// Generate pagination buttons pattern
export function getPaginationPattern(
  count: number,
  index: number,
  currentPage: number,
) {
  const boundary = Math.ceil(paginationRange / 2);

  if (count <= paginationRange) return index + 1;
  if (count > paginationRange) {
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
      : index === paginationRange - 1
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
