import { useMemo } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { z } from 'zod';

import { FilterParamsSchema } from '@/lib/schemas/transaction.schema';

type FilterKey = keyof z.infer<typeof FilterParamsSchema>;

const FILTER_KEYS = new Set<string>(Object.keys(FilterParamsSchema.shape));

export function useFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const filters = useMemo(
    () =>
      Array.from(searchParams.entries())
        .filter(([key, value]) => FILTER_KEYS.has(key) && value !== '')
        .map(([key, value]) => ({ key: key as FilterKey, value })),
    [searchParams],
  );

  const clearAll = () => {
    const newSearchParam = new URLSearchParams(searchParams.toString());
    FILTER_KEYS.forEach((filter) => newSearchParam.delete(filter));

    router.replace(`${pathname}?${newSearchParam}`);
  };

  const clearFilter = ({ key, value }: { key: FilterKey; value: string }) => {
    const newSearchParam = new URLSearchParams(searchParams.toString());

    if (!newSearchParam.has(key)) return;

    if (
      newSearchParam.getAll(key).length === 1 &&
      newSearchParam.get(key) === value
    ) {
      newSearchParam.delete(key);
    } else {
      const values = newSearchParam.getAll(key).filter((el) => el !== value);
      newSearchParam.delete(key);
      values.forEach((el) => newSearchParam.append(key, el));
    }

    router.replace(`${pathname}?${newSearchParam}`);
  };

  return { filters, clearAll, clearFilter };
}
