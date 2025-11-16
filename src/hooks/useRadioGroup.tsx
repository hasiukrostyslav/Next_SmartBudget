import { useState } from 'react';

export function useRadioGroup() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  return { selected, handleSelect, setSelected };
}
