'use client';

import Image from 'next/image';
import { useTheme } from '@/_hooks/useTheme';

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === 'light' ? '/logo-dark.svg' : '/logo-light.svg'}
      alt='Logo'
      width={404}
      height={92}
      className='w-[300px] h-auto'
    />
  );
}
