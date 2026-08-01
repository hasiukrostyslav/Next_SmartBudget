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

  return { filters, clearAll };
}
