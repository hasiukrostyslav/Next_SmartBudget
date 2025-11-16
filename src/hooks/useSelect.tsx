import { useEffect, useId, useRef, useState } from 'react';

interface useSelectProps {
  defaultValue: string | undefined;
}

export function useSelect({ defaultValue }: useSelectProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultValue || 'all');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedItem(option);
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!selectRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };
  const handleToggle = () => setIsOpen(!isOpen);

  return {
    id,
    isOpen,
    selectedItem,
    selectRef,
    handleSelect,
    handleBlur,
    handleToggle,
  };
}
