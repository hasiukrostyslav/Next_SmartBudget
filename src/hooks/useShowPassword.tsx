import { useState } from 'react';

export function useShowPassword() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsPasswordShown((prev) => !prev);
  }

  return { isPasswordShown, handleClick };
}
