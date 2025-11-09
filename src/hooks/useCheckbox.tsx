import { useState } from 'react';

export default function useCheckbox() {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => setChecked(!checked);
  const toggleCheckOnKey = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggleCheck();
    }
  };

  return { checked, toggleCheck, toggleCheckOnKey };
}
