import { useCallback, useEffect, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { INPUT_CONFIG } from '@/lib/constants/components';
import { createQueryString } from '@/lib/utils/utils';

// Every URL change re-renders the transactions list on the server and remounts
// it (the page keys its Suspense boundary on the params to show the loading
// overlay), so the search param is written once typing pauses, not on every
// keystroke.
export const SEARCH_DEBOUNCE_MS = 300;

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
  const pendingWrite = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelPendingWrite = useCallback(() => {
    if (pendingWrite.current) clearTimeout(pendingWrite.current);
    pendingWrite.current = null;
  }, []);

  const writeSearchParam = useCallback(
    (value: string) => {
      // Read the URL when writing, not when the key was pressed, so a sort or
      // page change made during the debounce window is kept.
      const current = new URLSearchParams(window.location.search);
      const newSearchString = createQueryString(current, [
        { param: 'search', value },
      ]);
      router.replace(`${pathname}?${newSearchString}`);
    },
    [pathname, router],
  );

  const handleClear = useCallback(() => {
    setSearchQuery('');

    if (isUpdateSearchParam) {
      cancelPendingWrite();
      writeSearchParam('');
    }
  }, [isUpdateSearchParam, cancelPendingWrite, writeSearchParam]);

  useEffect(() => {
    if (isContentExpanded) {
      handleClear();
    }
  }, [isContentExpanded, handleClear]);

  // Empty the box when the param disappears from the URL (e.g. "Clear all"),
  // but not while a write is pending: the URL simply hasn't caught up yet.
  useEffect(() => {
    if (
      isUpdateSearchParam &&
      !searchParams.get('search') &&
      !pendingWrite.current
    )
      setSearchQuery('');
  }, [isUpdateSearchParam, searchParams]);

  // Never navigate after the input has unmounted.
  useEffect(() => cancelPendingWrite, [cancelPendingWrite]);

  const role: keyof typeof INPUT_CONFIG.button.roleIcon = 'clear';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!isUpdateSearchParam) return;

    cancelPendingWrite();
    pendingWrite.current = setTimeout(() => {
      pendingWrite.current = null;
      writeSearchParam(value);
    }, SEARCH_DEBOUNCE_MS);
  };

  return { searchQuery, role, handleChange, handleClear };
}
