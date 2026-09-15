import { clsx } from 'clsx';

import { IconName } from '@/types/types';

import SegmentedControlRadioItem from './SegmentedControlRadioItem';

interface SegmentedControlProps {
  label: string;
  selectedValue: string;
  onSelect: (option: string) => void;
  options: readonly {
    option: string;
    icon: IconName;
    color: string;
  }[];
}

export default function SegmentedControl({
  label,
  selectedValue,
  options,
  onSelect,
}: SegmentedControlProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={clsx(
        'flex items-center justify-between gap-2 rounded-md p-1',
        'w-full bg-slate-500/10',
      )}
    >
      {options.map((el) => (
        <SegmentedControlRadioItem
          key={el.option}
          option={el.option}
          iconName={el.icon}
          color={el.color}
          selectedValue={selectedValue}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
