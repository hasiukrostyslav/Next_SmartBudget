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
  const urlSearch = searchParams.get('search') ?? '';
  const [searchQuery, setSearchQuery] = useState(
    isUpdateSearchParam ? urlSearch : '',
  );
  const pathname = usePathname();
  const router = useRouter();
  const pendingWrite = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The last search value this hook wrote to the URL. The navigation arrives
  // some time after router.replace, and the box may hold newer text by then;
  // the hook's own earlier write must not wipe it.
  const [lastWrittenSearch, setLastWrittenSearch] = useState<string | null>(
    null,
  );

  // State adjusted while rendering, from the previous render's values, instead
  // of in effects (which render twice and can cascade):
  // - a dropdown's search box starts empty each time the dropdown opens;
  // - the page's search box empties when the search param is removed from the
  //   URL (e.g. "Clear all"). Only a change of the search value itself counts,
  //   so a sort or page change made mid-typing leaves the text alone.
  const [wasExpanded, setWasExpanded] = useState(isContentExpanded);
  if (isContentExpanded !== wasExpanded) {
    setWasExpanded(isContentExpanded);
    if (isContentExpanded) setSearchQuery('');
  }

  const [lastUrlSearch, setLastUrlSearch] = useState(urlSearch);
  if (urlSearch !== lastUrlSearch) {
    setLastUrlSearch(urlSearch);
    // Only a removal made elsewhere (e.g. "Clear all") empties the box: the
    // hook's own Clear emptied it already, and the user may have typed since.
    if (isUpdateSearchParam && !urlSearch && urlSearch !== lastWrittenSearch)
      setSearchQuery('');
  }

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
      setLastWrittenSearch(value);
      router.replace(`${pathname}?${newSearchString}`);
    },
    [pathname, router],
  );

  const handleClear = () => {
    setSearchQuery('');

    if (isUpdateSearchParam) {
      cancelPendingWrite();
      writeSearchParam('');
    }
  };

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
