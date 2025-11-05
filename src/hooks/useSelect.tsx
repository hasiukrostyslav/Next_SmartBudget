'use client';

import { useEffect, useId, useRef, useState } from 'react';

export function useSelect() {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('all');
  const selectRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => removeEventListener('mousedown', handleClickOutside);
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
