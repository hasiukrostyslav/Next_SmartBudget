'use client';

import { use } from 'react';
import { ThemeContext } from '@/_context/ThemeContext';

export default function useTheme() {
  const context = use(ThemeContext);

  if (!context)
    throw new Error('ThemeContext has to be used within ThemeProvider');

  const { theme, setLightTheme, setDarkTheme } = context;

  return { theme, setLightTheme, setDarkTheme };
}
