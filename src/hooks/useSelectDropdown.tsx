import { useEffect, useId, useRef, useState } from 'react';

interface useSelectDropdownProps {
  onSelect: (value: string | number) => void;
}

export function useSelectDropdown({ onSelect }: useSelectDropdownProps) {
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const id = useId();

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

  const handleBlur = (e: React.FocusEvent) => {
    if (!selectRef.current?.contains(e.relatedTarget)) {
      setIsContentExpanded(false);
    }
  };
  const handleSelect = (value: string | number) => {
    setIsContentExpanded(false);
    onSelect(value);
  };
  const handleToggleExpanded = () => setIsContentExpanded(!isContentExpanded);

  return {
    id,
    selectRef,
    isContentExpanded,
    handleBlur,
    handleSelect,
    handleToggleExpanded,
  };
}
