'use client';

import { createContext, useEffect, useState } from 'react';

interface themeContextType {
  theme: 'light' | 'dark';
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

export const ThemeContext = createContext<themeContextType | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (
      theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');

  return (
    <ThemeContext value={{ theme, setLightTheme, setDarkTheme }}>
      {children}
    </ThemeContext>
  );
}
