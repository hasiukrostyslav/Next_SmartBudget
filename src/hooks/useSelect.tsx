import { useEffect, useId, useRef, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { createQueryString } from '@/lib/utils/utils';

interface useSelectProps {
  defaultValue: string | number | undefined;
  param?: string;
  onValueChange?: (value: string | number) => void;
}

export function useSelect({
  defaultValue,
  param,
  onValueChange,
}: useSelectProps) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Close by click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsContentExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close by click Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsContentExpanded(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (option: string | number) => {
    setSelectedValue(option);
    setIsContentExpanded(false);

    if (onValueChange) onValueChange(option);

    // Make new request if autoFetchOnChange is true
    if (param) {
      const newSearchString = createQueryString(searchParams, [
        { param, value: option },
      ]);

      router.replace(`${pathname}?${newSearchString}`);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!selectRef.current?.contains(e.relatedTarget)) {
      setIsContentExpanded(false);
    }
  };
  const handleToggleExpanded = () => setIsContentExpanded(!isContentExpanded);

  return {
    id,
    selectRef,
    selectedValue,
    isContentExpanded,
    handleBlur,
    handleSelect,
    handleToggleExpanded,
  };
}
