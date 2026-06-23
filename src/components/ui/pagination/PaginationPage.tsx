'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { createQueryString } from '@/lib/utils/utils';

import PaginationButton from './PaginationButton';
import PaginationSkip from './PaginationSkip';

interface PaginationPageProps {
  pageCount: number;
  currentPage: number;
  stack: (number | null | undefined)[];
  prevPageQuery: string;
  nextPageQuery: string;
}

export default function PaginationPage({
  pageCount,
  currentPage,
  stack,
  prevPageQuery,
  nextPageQuery,
}: PaginationPageProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center gap-2">
      <PaginationButton
        href={`${pathname}?${prevPageQuery}`}
        page="prev"
        disabled={pageCount === 1 || currentPage === 1}
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
        disabled={pageCount === 1 || currentPage === pageCount}
      />
    </div>
  );
}
