import { clsx } from 'clsx';

import { IconName } from '@/types/types';

import SegmentedControlRadioItem from './SegmentedControlRadioItem';

interface SegmentedControlProps {
  selectedValue: string;
  handleSelect: () => void;
  options: {
    option: string;
    icon: IconName;
    color: string;
  }[];
}

export default function SegmentedControl({
  selectedValue,
  options,
  handleSelect,
}: SegmentedControlProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between gap-2 rounded-md p-2',
        'w-full bg-slate-500/10',
      )}
    >
      {options.map((el) => (
        <SegmentedControlRadioItem
          key={el.option}
          option={el.option}
          icon={el.icon}
          color={el.color}
          selectedValue={selectedValue}
          handleSelect={handleSelect}
        />
      ))}
    </div>
  );
}
