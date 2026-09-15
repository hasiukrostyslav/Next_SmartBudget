import { useSearchParams } from 'next/navigation';

import { PAGINATION_RANGE } from '@/lib/constants/constants';
import { SearchParamsSchema } from '@/lib/schemas/transaction.schema';
import { createQueryString, getPaginationPattern } from '@/lib/utils/utils';

export function usePagination(totalCount: number) {
  const searchParams = useSearchParams();

  // Parsed with the same schema as the server, so a hand-edited ?limit=abc
  // shows the page size actually rendered instead of "NaN".
  const { limit, page: currentPage } = SearchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );
  const pageCount = Math.ceil(totalCount / limit);

  const stack = Array.from(
    {
      length: pageCount > PAGINATION_RANGE ? PAGINATION_RANGE : pageCount,
    },
    (_, i) => {
      const paginationPattern = getPaginationPattern(pageCount, i, currentPage);
      return paginationPattern;
    },
  );

  const itemsRange = {
    min: currentPage === 1 ? 1 : limit * (currentPage - 1) + 1,
    max:
      currentPage === 1
        ? limit < totalCount
          ? limit
          : totalCount
        : limit * currentPage < totalCount
          ? limit * currentPage
          : totalCount,
  };

  const prevPageQuery = createQueryString(searchParams, [
    { param: 'page', value: currentPage - 1 },
  ]);
  const nextPageQuery = createQueryString(searchParams, [
    { param: 'page', value: currentPage + 1 },
  ]);

  return {
    pageCount,
    limit,
    itemsRange,
    currentPage,
    stack,
    prevPageQuery,
    nextPageQuery,
  };
}
