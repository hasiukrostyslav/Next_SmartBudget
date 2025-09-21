'use client';

import useTheme from '@/_hooks/useTheme';
import Icon from './Icon';

export default function ThemeButton({ className }: { className?: string }) {
  const { theme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <div
      className={`flex gap-6 px-2 py-1 border-2 border-slate-300 rounded-2xl ${className}`}
    >
      <button
        className={`outline-round-full p-1 ${
          theme === 'light' ? 'bg-slate-300' : ''
        }`}
        onClick={setLightTheme}
      >
        <Icon name='sun' />
      </button>
      <button
        className={`outline-round-full p-1 ${
          theme === 'dark' ? 'bg-slate-300' : ''
        }`}
        onClick={setDarkTheme}
      >
        <Icon name='moon' />
      </button>
    </div>
  );
}
