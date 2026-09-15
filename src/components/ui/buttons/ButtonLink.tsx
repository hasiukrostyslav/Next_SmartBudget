import Link from 'next/link';

import clsx from 'clsx';

import { IconName } from '@/types/types';

import { BUTTON_CONFIG } from '@/lib/constants/components';

import Icon from '../icons/Icon';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  disabled?: boolean;
  color: keyof typeof BUTTON_CONFIG.color;
  iconName: IconName;
}

export default function ButtonLink({
  href,
  children,
  disabled,
  color,
  iconName,
}: ButtonLinkProps) {
  const className = clsx(
    'outline-round-md flex items-center gap-1.5 rounded-lg border-2 px-4 py-2 text-base',
    disabled ? 'border-slate-400 bg-slate-400' : BUTTON_CONFIG.color[color],
  );
  const content = (
    <>
      <Icon name={iconName} size={18} />
      {children}
    </>
  );

  // A link has no disabled state: render inert text instead of a link that
  // still navigates.
  if (disabled)
    return (
      <span className={className} aria-disabled="true">
        {content}
      </span>
    );

  return (
    <Link className={className} href={href}>
      {content}
    </Link>
  );
}
