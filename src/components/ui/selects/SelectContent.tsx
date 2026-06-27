import clsx from 'clsx';

import { SelectOption } from '@/types/types';

import { useTheme } from '@/hooks/useTheme';

import SelectItem from './SelectItem';

interface SelectContentProps {
  id: string;
  options: SelectOption[];
  selectedValue: string | number | undefined;
  isContentExpanded: boolean;
  showSelectedOption: boolean;
  position: 'top' | 'bottom';
  widthExpandedTo: 'left' | 'right';
  onSelect: (option: string | number) => void;
}

export default function SelectContent({
  id,
  options,
  selectedValue,
  isContentExpanded,
  showSelectedOption,
  position,
  widthExpandedTo,
  onSelect,
}: SelectContentProps) {
  const { theme } = useTheme();

  const sortedOptions = options.toSorted((a, b) =>
    a.label.localeCompare(b.label, undefined, { numeric: true }),
  );

  return (
    <div
      id={`select-list-${id}`}
      role="listbox"
      className={clsx(
        'absolute z-50 w-full text-sm',
        'transition-all duration-400 ease-in',
        isContentExpanded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
        widthExpandedTo === 'left' && 'w-24 min-w-max -translate-x-7/12',
        widthExpandedTo === 'right' && 'w-24 min-w-max translate-x-3',
        position === 'top'
          ? 'bottom-[calc(100%+4px)] origin-bottom'
          : 'origin-top translate-y-1',
      )}
    >
      <div
        tabIndex={-1}
        className={clsx(
          'scrollbar grid max-h-75 gap-1 p-2 shadow-md',
          'rounded-md border border-slate-300 dark:border-slate-600',
          'overflow-y-auto bg-slate-50 dark:bg-slate-800 dark:text-slate-400',
          theme === 'dark' ? 'scrollbar-dark' : '',
        )}
      >
        {sortedOptions.map((option) => (
          <SelectItem
            key={option.value}
            option={option}
            onSelect={onSelect}
            selectedValue={selectedValue}
            showSelectedOption={showSelectedOption}
            isContentExpanded={isContentExpanded}
          />
        ))}
      </div>
    </div>
  );
}
