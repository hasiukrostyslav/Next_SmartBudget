import Link from 'next/link';
import clsx from 'clsx';
import Icon from '../Icon';
import { BUTTON_CONFIG } from '@/lib/constants/ui';
import { IconName } from '@/types/types';

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
  return (
    <Link
      className={clsx(
        'outline-round-md flex items-center gap-1.5 rounded-lg border-2 px-4 py-2 text-base',
        disabled ? 'border-slate-400 bg-slate-400' : BUTTON_CONFIG.color[color],
      )}
      href={href}
    >
      <Icon name={iconName} size={18} />
      {children}
    </Link>
  );
}
