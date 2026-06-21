'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { createQueryString } from '@/lib/utils/utils';
import { usePagination } from '@/hooks/usePagination';

import PaginationButton from './PaginationButton';
import PaginationSkip from './PaginationSkip';

interface PaginationPageProps {
  totalCount: number;
}

export default function PaginationPage({ totalCount }: PaginationPageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { count, currentPage, stack, prevPageQuery, nextPageQuery } =
    usePagination(totalCount);

  return (
    <div className="flex items-center gap-2">
      <PaginationButton
        href={`${pathname}?${prevPageQuery}`}
        page="prev"
        disabled={count === 1 || currentPage === 1}
      />

      {stack.map((page, i) =>
        page ? (
          <PaginationButton
            key={page}
            page={page}
            href={`${pathname}?${createQueryString(searchParams, [{ param: 'page', value: page }])}`}
            active={page === currentPage}
          />
        ) : (
          <PaginationSkip key={`${i}-skip`} />
        ),
      )}
      <PaginationButton
        href={`${pathname}?${nextPageQuery}`}
        page="next"
        disabled={count === 1 || currentPage === count}
      />
    </div>
  );
}
