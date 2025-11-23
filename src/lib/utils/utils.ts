import { pageSizeOptions } from '../constants/constants';

export function createSearchParamsString(
  searchString: string,
  param: string,
  option: string | number,
) {
  const slugOption = toSlug(option);

  const searchParams = searchString
    .split('&')
    .map((searchParam) =>
      searchParam.startsWith(`${param}=`)
        ? searchParam
            .split('=')
            .map((el, i) => (i === 0 ? el : slugOption))
            .join('=')
        : searchParam,
    )
    .join('&');

  return searchParams.split('&').find((el) => el.startsWith(`${param}=`))
    ? searchParams
    : searchParams.concat(`&${param}=${slugOption}`);
}

export function toSlug(str: string | number) {
  if (typeof str === 'number') return str;
  return str.toLowerCase().replace(/\s+/g, '-');
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
