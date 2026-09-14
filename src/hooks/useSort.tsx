import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SearchParamsSchema } from '@/lib/schemas/transaction.schema';
import { createQueryString } from '@/lib/utils/utils';

export function useSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Parsed with the server's schema, so the highlighted column and arrow match
  // the order the list is actually in — including the date/desc default when
  // the URL has no sort at all.
  const { sort, order } = SearchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const handleSort = (label: string) => {
    const orderValue = sort === label && order === 'desc' ? 'asc' : 'desc';

    const newSearchString = createQueryString(searchParams, [
      { param: 'sort', value: label },
      {
        param: 'order',
        value: orderValue,
      },
    ]);
    router.replace(`${pathname}?${newSearchString}`);
  };

  return { handleSort, sort, order };
}
