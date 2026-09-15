import Image from 'next/image';

import clsx from 'clsx';

interface LogoProps {
  type: 'sm' | 'lg';
  className?: string;
}

// The large logo swaps by CSS (`dark:` variant) instead of reading the theme in
// JS, so it is right on first paint — the server can't know the theme, and a
// JS-chosen src would flash the wrong logo until hydration.
export default function Logo({ className, type }: LogoProps) {
  if (type === 'sm')
    return (
      <Image
        src="/logo-sm.svg"
        alt="Logo"
        width={404}
        height={92}
        className={clsx('w-auto', className)}
        priority
      />
    );

  return (
    <>
      <Image
        src="/logo-dark.svg"
        alt="Logo"
        width={404}
        height={92}
        className={clsx('w-auto dark:hidden', className)}
        priority
      />
      <Image
        src="/logo-light.svg"
        alt=""
        aria-hidden
        width={404}
        height={92}
        className={clsx('hidden w-auto dark:inline', className)}
        priority
      />
    </>
  );
}
