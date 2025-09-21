'use client';

import Image from 'next/image';
import useTheme from '@/_hooks/useTheme';

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === 'light' ? '/logo-dark.svg' : '/logo-light.svg'}
      alt='Logo'
      width={200}
      height={100}
    />
  );
}
