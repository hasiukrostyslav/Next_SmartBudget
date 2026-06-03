import { clsx } from 'clsx';

import { IconName } from '@/types/types';

import Icon from '../icons/Icon';

interface SegmentedControlRadioItemProps {
  option: string;
  icon: IconName;
  color: string;
  selectedValue: string;
  handleSelect: (option: string) => void;
}

export default function SegmentedControlRadioItem({
  option,
  icon,
  color,
  selectedValue,
  handleSelect,
}: SegmentedControlRadioItemProps) {
  return (
    <label
      tabIndex={0}
      role="radio"
      className={clsx(
        'outline-input w-1/2 cursor-pointer rounded-md px-4 py-1.5',
        selectedValue === option
          ? `bg-slate-50 dark:bg-slate-700 ${color}`
          : 'text-slate-500',
      )}
    >
      <div className={clsx('flex items-center justify-center gap-1 text-sm')}>
        <Icon name={icon} size={16} />
        <span>{option}</span>
      </div>
      <input
        type="radio"
        className="peer hidden"
        onChange={() => handleSelect(option)}
        name={option}
        value={option}
        checked={selectedValue === option}
      />
    </label>
  );
}
