import clsx from 'clsx';
import { IconName } from '@/types/types';
import Icon from './Icon';

interface ButtonIconProps {
  iconName: IconName;
  size: number;
  shape: 'round' | 'square';
  variant: 'solid' | 'outline';
  className?: string;
}

export default function ButtonIcon({
  iconName,
  size,
  shape,
  variant,
  className,
}: ButtonIconProps) {
  return (
    <button
      className={clsx(
        'p-1.5',
        shape === 'round'
          ? 'outline-round-full rounded-full'
          : 'outline-round-sm',
        variant === 'solid'
          ? 'bg-blue-200/45 text-slate-500 dark:bg-slate-600 dark:text-slate-400'
          : '',
        className,
      )}
    >
      <Icon name={iconName} size={size} />
    </button>
  );
}
