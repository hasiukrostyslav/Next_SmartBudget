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
        'outline-input flex items-center justify-center gap-1 rounded-md px-4 py-1.5',
        'dark:text-slate-400 dark:hover:bg-slate-800',
        disabled ? 'cursor-default' : 'hover:bg-slate-200',
      )}
    >
      <Icon name={iconName} size={iconSize} />
      <span>{label}</span>
    </button>
  );
}
