import { pageSizeOptions } from '../constants/constants';

export function createQueryString(
  searchParams: URLSearchParams,
  name: string,
  value: string | number,
) {
  const slugValue = toSlug(value);

  const params = new URLSearchParams(searchParams.toString());
  params.set(name, slugValue);

  return params.toString();
}

export function toSlug(value: string | number) {
  if (typeof value === 'number') return String(value);
  return value.toLowerCase().replace(/\s+/g, '-');
}

export function fromSlug(slug: string | number) {
  if (typeof slug === 'number') return slug;
  return slug.replace(/-/g, ' ');
}

export function getPageSizeOption(totalCount: number) {
  const options = [...pageSizeOptions];
  const index = options.findIndex((count) => count > totalCount);

  if (index === -1) return options;

  return options.slice(0, index + 1);
}
