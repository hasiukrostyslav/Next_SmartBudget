import { useState } from 'react';

import { INPUT_CONFIG } from '@/lib/constants/components';

export function usePasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  // Derived, not stored: a second state value set from the pre-update
  // isVisible only matched because the staleness flipped on every click.
  const buttonRole: keyof typeof INPUT_CONFIG.button.roleIcon = isVisible
    ? 'hidePassword'
    : 'showPassword';

  const toggleVisibility = () => setIsVisible((visible) => !visible);

  return { buttonRole, toggleVisibility };
}
