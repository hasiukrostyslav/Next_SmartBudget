import { useEffect, useId, useRef, useState } from 'react';

interface useSelectProps {
  defaultOption: string | number | undefined;
}

export function useSelect({ defaultOption }: useSelectProps) {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const id = useId();

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
