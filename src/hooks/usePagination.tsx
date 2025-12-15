import { useSearchParams } from 'next/navigation';
import { pageSizeOptions, paginationRange } from '@/lib/constants/constants';
import { createQueryString, getPaginationPattern } from '@/lib/utils/utils';

export function usePagination(totalItems: number) {
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get('limit') || pageSizeOptions[0]);
  const currentPage = Number(searchParams.get('page') || 1);
  const count = Math.ceil(totalItems / limit);

  const stack = Array.from(
    {
      length: count > paginationRange ? paginationRange : count,
    },
    (_, i) => {
      const paginationPattern = getPaginationPattern(count, i, currentPage);
      return paginationPattern;
    },
  );

  const prevPageQuery = createQueryString(
    searchParams,
    'page',
    currentPage - 1,
  );
  const nextPageQuery = createQueryString(
    searchParams,
    'page',
    currentPage + 1,
  );

  return {
    count,
    currentPage,
    stack,
    prevPageQuery,
    nextPageQuery,
  };
}
