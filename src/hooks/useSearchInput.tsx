import { useEffect, useState } from 'react';

import { INPUT_CONFIG } from '@/lib/constants/components';

interface useSearchInputProps {
  isContentExpanded?: boolean;
}

export function useSearchInput({ isContentExpanded }: useSearchInputProps) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isContentExpanded) {
      handleClear();
    }
  }, [isContentExpanded]);

  const role: keyof typeof INPUT_CONFIG.button.roleIcon = 'clear';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => setSearchQuery('');

  const filterSearchedOptions = () => {};

  return { searchQuery, role, handleChange, handleClear };
}
