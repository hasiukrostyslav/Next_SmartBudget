'use client';

import { IconName } from '@/types/types';
import Icon from '../Icon';
import clsx from 'clsx';

interface ToolbarButtonProps {
  iconName: IconName;
  label: string;
  iconSize: number;
  onClick: () => void;
  disabled?: boolean;
}

export default function ToolbarButton({
  iconName,
  label,
  iconSize,
  onClick,
  disabled,
}: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'outline-input flex items-center justify-center gap-1 rounded-md px-4 py-1',
        disabled
          ? 'cursor-default text-slate-400'
          : 'bg-blue-500 hover:bg-blue-600',
      )}
    >
      <Icon name={iconName} size={iconSize} />
      <span>{label}</span>
    </button>
  );
}
