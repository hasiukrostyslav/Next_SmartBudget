import { createSearchParamsString } from '@/lib/utils/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

interface useSelectProps {
  defaultOption: string | number | undefined;
  param: string;
  autoFetchOnChange?: boolean;
}

export function useSelect({
  defaultOption,
  param,
  autoFetchOnChange,
}: useSelectProps) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();

  // Close by click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close by click Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsExpanded(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (option: string | number) => {
    setSelectedOption(option);
    setIsExpanded(false);

    // Make new request if autoFetchOnChange is true
    if (autoFetchOnChange) {
      if (!searchString) {
        router.replace(`?${param}=${option}`);
      } else {
        const newSearchString = createSearchParamsString(
          searchString,
          param,
          option,
        );

        router.replace(`?${newSearchString}`);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!selectRef.current?.contains(e.relatedTarget)) {
      setIsExpanded(false);
    }
  };
  const handleToggleExpanded = () => setIsExpanded(!isExpanded);

  return {
    id,
    selectRef,
    selectedOption,
    isExpanded,
    handleBlur,
    handleSelect,
    handleToggleExpanded,
  };
}
