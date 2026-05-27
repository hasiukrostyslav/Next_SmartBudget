import { INPUT_CONFIG } from '@/lib/constants/ui';
import { useState } from 'react';

export function useSearchInput() {
  const [searchQuery, setSearchQuery] = useState('');
  const role: keyof typeof INPUT_CONFIG.button.roleIcon = 'clear';

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onClear = () => setSearchQuery('');

  return { searchQuery, role, onChange, onClear };
}
