'use client';

import { clsx } from 'clsx';

import { IconName } from '@/types/types';

import Icon from '../icons/Icon';

interface RadioCardProps {
  option: string;
  selectedValue?: string | number;
  isCurrent: boolean;
  iconName: IconName;
  text: { header: string; description: string };
  styleConfig: {
    badge: string;
    card: string;
    icon: string;
    radio: string;
  };
  onSelect: (option: string) => void;
}

export default function RadioCard({
  option,
  selectedValue,
  isCurrent,
  iconName,

  text,
  styleConfig,
  onSelect,
}: RadioCardProps) {
  return (
    <label
      tabIndex={0}
      role="radio"
      aria-checked={selectedValue === option || (!selectedValue && isCurrent)}
      className={clsx(
        'outline-input flex cursor-pointer items-center gap-3 rounded-xl border-2',
        'px-4 py-2',
        selectedValue === option || (!selectedValue && isCurrent)
          ? styleConfig.card
          : `border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500`,
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSelect(option);
        }
      }}
    >
      <div className={clsx('rounded-md p-1.5', styleConfig.icon)}>
        <Icon name={iconName} size={20} />
      </div>
      <div>
        <span
          className={clsx(
            'flex items-center gap-2 font-semibold dark:text-slate-300',
          )}
        >
          {text.header.length > 15 && isCurrent
            ? text.header.slice(0, 12) + '...'
            : text.header}
          {isCurrent && (
            <span className="rounded-xl bg-slate-300 px-2 text-xs text-slate-700">
              CURRENT
            </span>
          )}
        </span>

        <span className="block text-xs text-slate-500">{text.description}</span>
      </div>

      <span
        className={clsx(
          'ml-auto h-4 w-4 rounded-full',
          selectedValue === option || (!selectedValue && isCurrent)
            ? styleConfig.radio + ' border-6'
            : 'border border-slate-400 dark:border-slate-700',
        )}
      ></span>

      <input
        type="radio"
        className="peer hidden"
        // The labelled element with role="radio" is the control assistive tech
        // should see; this native input only carries the form value.
        aria-hidden
        tabIndex={-1}
        onChange={() => onSelect(option)}
        name={option}
        value={option}
        checked={selectedValue === option}
      />
    </label>
  );
}
