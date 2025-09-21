'use client';

import { LuSun, LuMoon } from 'react-icons/lu';
import useTheme from '@/_hooks/useTheme';

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <LuSun /> : <LuMoon />}
    </button>
  );
}
