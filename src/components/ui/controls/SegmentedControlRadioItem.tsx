import { clsx } from 'clsx';

import { IconName } from '@/types/types';

import Icon from '../icons/Icon';

interface SegmentedControlRadioItemProps {
  option: string;
  iconName: IconName;
  color: string;
  selectedValue: string;
  onSelect: (option: string) => void;
}

export default function SegmentedControlRadioItem({
  option,
  iconName,
  color,
  selectedValue,
  onSelect,
}: SegmentedControlRadioItemProps) {
  return (
    <label
      tabIndex={0}
      role="radio"
      aria-checked={selectedValue === option}
      className={clsx(
        'outline-input w-1/2 cursor-pointer rounded-md px-4 py-1.5',
        selectedValue === option
          ? `bg-slate-50 dark:bg-slate-700 ${color}`
          : 'text-slate-500',
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSelect(option);
        }
      }}
    >
      <div className={clsx('flex items-center justify-center gap-1 text-sm')}>
        <Icon name={iconName} size={16} />
        <span>{option}</span>
      </div>
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
