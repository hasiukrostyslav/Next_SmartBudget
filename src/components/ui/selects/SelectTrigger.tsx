import React from 'react';

import { clsx } from 'clsx';

import { SELECT_CONFIG } from '@/lib/constants/components';

import Icon from '../icons/Icon';

interface SelectTriggerProps {
  children: React.ReactNode;
  label: string;
  id: string;
  width?: keyof typeof SELECT_CONFIG.width;
  padding?: keyof typeof SELECT_CONFIG.padding;
  variant?: keyof typeof SELECT_CONFIG.variant;
  isContentExpanded: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function SelectTrigger({
  children,
  label,
  id,
  width = 'md',
  padding = 'sm',
  variant = 'primary',
  isContentExpanded,
  disabled,
  onClick,
}: SelectTriggerProps) {
  return (
    <button
      id={`select-label-${id}`}
      name={label}
      aria-haspopup="listbox"
      aria-controls={`select-list-${id}`}
      aria-expanded={isContentExpanded}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'flex items-center justify-between px-2.5 text-sm font-medium',
        'outline-input rounded-md border',
        'dark:text-slate-400',
        SELECT_CONFIG.width[width],
        SELECT_CONFIG.padding[padding],
        disabled
          ? 'border-slate-300 bg-slate-200/50 text-slate-400 dark:border-slate-500 dark:bg-slate-600'
          : SELECT_CONFIG.variant[variant],
      )}
    >
      {children}
      <Icon
        size={16}
        name="chevron-down"
        className={clsx(
          'transform transition-transform duration-400 ease-in-out',
          isContentExpanded ? 'rotate-180' : 'rotate-0',
        )}
      />
    </button>
  );
}
