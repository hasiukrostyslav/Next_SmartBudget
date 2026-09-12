import { useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { INPUT_CONFIG } from '@/lib/constants/components';
import { createQueryString } from '@/lib/utils/utils';

interface useSearchInputProps {
  isContentExpanded?: boolean;
  isUpdateSearchParam?: boolean;
}

export function useSearchInput({
  isContentExpanded,
  isUpdateSearchParam,
}: useSearchInputProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    isUpdateSearchParam ? (searchParams.get('search') ?? '') : '',
  );
  const pathname = usePathname();
  const router = useRouter();

  const handleClear = useCallback(() => {
    setSearchQuery('');

    if (isUpdateSearchParam) {
      const newSearchString = createQueryString(searchParams, [
        { param: 'search', value: '' },
      ]);
      router.replace(`${pathname}?${newSearchString}`);
    }
  }, [isUpdateSearchParam, searchParams, pathname, router]);

  useEffect(() => {
    if (isContentExpanded) {
      handleClear();
    }
  }, [isContentExpanded, handleClear]);

  useEffect(() => {
    if (isUpdateSearchParam && !searchParams.get('search')) setSearchQuery('');
  }, [isUpdateSearchParam, searchParams]);

  const role: keyof typeof INPUT_CONFIG.button.roleIcon = 'clear';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (isUpdateSearchParam) {
      const newSearchString = createQueryString(searchParams, [
        { param: 'search', value: e.target.value },
      ]);
      router.replace(`${pathname}?${newSearchString}`);
    }
  };

  return { searchQuery, role, handleChange, handleClear };
}
