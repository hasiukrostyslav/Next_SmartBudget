'use client';

import { createContext, useMemo, useSyncExternalStore } from 'react';

import { THEME_STORAGE_KEY } from '@/lib/constants/theme';

export enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

interface ThemeContextType {
  theme: THEME;
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

// The `dark` class on <html> is the single source of truth. THEME_INIT_SCRIPT
// sets it before paint; React only reads it. The server cannot know the
// theme, so it renders LIGHT and useSyncExternalStore re-renders with the real
// value right after hydration — without a hydration mismatch.
const listeners = new Set<() => void>();

function readStoredTheme(): THEME | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === THEME.DARK || value === THEME.LIGHT ? value : null;
  } catch {
    return null;
  }
}

function systemTheme(): THEME {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME.DARK
    : THEME.LIGHT;
}

function applyTheme(theme: THEME) {
  document.documentElement.classList.toggle(THEME.DARK, theme === THEME.DARK);
  listeners.forEach((listener) => listener());
}

function setTheme(theme: THEME) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The choice
    // still applies for this page view.
  }
  applyTheme(theme);
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  // Follow the OS only while the user hasn't made an explicit choice.
  const handleSystemChange = () => {
    if (!readStoredTheme()) applyTheme(systemTheme());
  };
  // Keep other open tabs in step with a choice made in this one.
  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY)
      applyTheme(readStoredTheme() ?? systemTheme());
  };

  media.addEventListener('change', handleSystemChange);
  window.addEventListener('storage', handleStorage);

  return () => {
    listeners.delete(listener);
    media.removeEventListener('change', handleSystemChange);
    window.removeEventListener('storage', handleStorage);
  };
}

const getSnapshot = () =>
  document.documentElement.classList.contains(THEME.DARK)
    ? THEME.DARK
    : THEME.LIGHT;

const getServerSnapshot = () => THEME.LIGHT;

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo(
    () => ({
      theme,
      setLightTheme: () => setTheme(THEME.LIGHT),
      setDarkTheme: () => setTheme(THEME.DARK),
    }),
    [theme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
