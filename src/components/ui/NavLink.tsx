'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Icon from './Icon';
import { IconName } from '@/types/types';

interface NavLinkProps {
  href: string;
  text: string;
  iconName: IconName;
}

export default function NavLink({ href, text, iconName }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        `outline-round-sm flex items-center gap-3 rounded-3xl px-7 py-2`,
        pathname === href
          ? 'bg-blue-500 text-blue-100'
          : 'text-slate-600 hover:text-blue-500 dark:text-blue-100',
      )}
      href={href}
    >
      <Icon name={iconName} size={22} />
      {text}
    </Link>
  );
}
