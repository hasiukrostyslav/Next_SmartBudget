'use client';

import Image from 'next/image';
import { useTheme } from '@/hooks/useTheme';

interface LogoProps {
  type: 'sm' | 'lg';
  className?: string;
}

export default function Logo({ className, type }: LogoProps) {
  const { theme } = useTheme();

  return (
    <Image
      src={
        type === 'lg'
          ? `/logo-${theme === 'light' ? 'dark' : 'light'}.svg`
          : '/logo-sm.svg'
      }
      alt="Logo"
      width={404}
      height={92}
      className={`w-auto ${className}`}
      priority
    />
  );
}
