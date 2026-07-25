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
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
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
