import { useState } from 'react';

export function useSelectValue() {
  const [selectedValue, setSelectedValue] = useState<string | number>('');

  return { selectedValue, setSelectedValue };
}
