'use client';

import { createContext, useEffect, useState } from 'react';

interface themeContextType {
  theme: 'light' | 'dark';
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<themeContextType | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext value={{ theme, setLightTheme, setDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}
