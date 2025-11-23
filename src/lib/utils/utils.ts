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
  if (typeof str === 'number') return;
  return str.toLowerCase().replace(/\s+/g, '-');
}

export function fromSlug(slug: string | number) {
  if (typeof slug === 'number') return;
  return slug.replace(/-/g, ' ');
}
