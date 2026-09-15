'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { useTheme } from '@/hooks/useTheme';

import Icon from '../icons/Icon';

export default function ThemeButton({ className }: { className?: string }) {
  const [isInitial, setIsInitial] = useState(true);
  const { theme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <div
      className={clsx(
        'flex gap-4 rounded-2xl border-2 border-blue-400 px-1 py-0.5',
        className,
      )}
    >
      <button
        type="button"
        aria-label="Light theme"
        aria-pressed={theme === 'light'}
        className={`outline-round-full p-1 ${
          theme === 'light' ? 'bg-blue-300 text-blue-600' : 'text-blue-200'
        } ${!isInitial && theme === 'light' ? 'animate-wiggle' : ''}`}
        onClick={() => {
          setIsInitial(true);
          setLightTheme();
          setIsInitial(false);
        }}
      >
        <Icon name="light" size={16} />
      </button>
      <button
        type="button"
        aria-label="Dark theme"
        aria-pressed={theme === 'dark'}
        className={`outline-round-full p-1 ${
          theme === 'dark' ? 'bg-blue-500 text-blue-200' : 'text-blue-600'
        } ${!isInitial && theme === 'dark' ? 'animate-wiggle' : ''}`}
        onClick={() => {
          setIsInitial(true);
          setDarkTheme();
          setIsInitial(false);
        }}
      >
        <Icon name="dark" size={16} />
      </button>
    </div>
  );
}
