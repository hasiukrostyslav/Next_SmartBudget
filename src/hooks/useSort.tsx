import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from '@/lib/utils/utils';

export function useSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (label: string) => {
    const orderValue = sort === label && order === 'desc' ? 'asc' : 'desc';

    const newSearchString = createQueryString(searchParams, [
      { name: 'sort', value: label },
      {
        name: 'order',
        value: orderValue,
      },
    ]);
    router.replace(`${pathname}?${newSearchString}`);
  };

  return { handleSort, sort, order };
}
