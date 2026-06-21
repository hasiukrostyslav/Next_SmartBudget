'use client';

import { clsx } from 'clsx';

import { IconName } from '@/types/types';

import Icon from '../icons/Icon';

interface RadioCardProps {
  option: string;
  selectedValue: string;
  isCurrent: boolean;
  iconName: IconName;
  withExtraContent: boolean;
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
  withExtraContent,
  text,
  styleConfig,
  onSelect,
}: RadioCardProps) {
  return (
    <label
      tabIndex={0}
      role="radio"
      className={clsx(
        'outline-input flex cursor-pointer items-center gap-3 rounded-xl border-2',
        withExtraContent ? 'px-4 py-2' : 'px-2 py-2',
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
      <div
        className={clsx(
          'rounded-md',
          styleConfig.icon,
          withExtraContent ? 'p-1.5' : 'p-1',
        )}
      >
        <Icon name={iconName} size={withExtraContent ? 20 : 16} />
      </div>
      <div>
        <h2
          className={clsx(
            'flex items-center gap-2 font-semibold dark:text-slate-300',
            withExtraContent ? '' : 'text-sm',
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
        </h2>
        {withExtraContent && (
          <p className="text-xs text-slate-500">{text.description}</p>
        )}
      </div>
      {withExtraContent && (
        <span
          className={clsx(
            'ml-auto h-4 w-4 rounded-full',
            selectedValue === option || (!selectedValue && isCurrent)
              ? styleConfig.radio + ' border-6'
              : 'border border-slate-400 dark:border-slate-700',
          )}
        ></span>
      )}
      <input
        type="radio"
        className="peer hidden"
        onChange={() => onSelect(option)}
        name={option}
        value={option}
        checked={selectedValue === option}
      />
    </label>
  );
}
