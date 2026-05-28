'use client';

import { createContext, useEffect, useState } from 'react';

export enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

interface ThemeContextType {
  theme: THEME;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<THEME>(() => {
    if (typeof window === 'undefined') return THEME.LIGHT;
    return document.documentElement.classList.contains(THEME.DARK)
      ? THEME.DARK
      : THEME.LIGHT;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle(THEME.DARK, theme === THEME.DARK);
  }, [theme]);

  const setLightTheme = () => setTheme(THEME.LIGHT);
  const setDarkTheme = () => setTheme(THEME.DARK);
  const toggleTheme = () =>
    setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
  return (
    <ThemeContext value={{ theme, setLightTheme, setDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}
