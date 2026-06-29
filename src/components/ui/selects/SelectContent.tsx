import clsx from 'clsx';

import { SelectOption } from '@/types/types';

import { useTheme } from '@/hooks/useTheme';

import Input from '../inputs/Input';
import SelectItem from './SelectItem';

interface SelectContentProps {
  id: string;
  options: SelectOption[];
  selectedValue: string | number | undefined;
  isContentExpanded: boolean;
  showSelectedOption: boolean;
  position: 'top' | 'bottom';
  widthExpandedTo?: string;
  expandedAlign?: 'left' | 'right';
  withSearch?: boolean;
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
  expandedAlign = 'left',
  withSearch,
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
        'absolute z-50 text-sm',
        'transition-all duration-400 ease-in',
        isContentExpanded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
        widthExpandedTo ?? 'w-full',
        expandedAlign === 'left' ? 'left-0' : 'right-0',
        position === 'top'
          ? 'bottom-[calc(100%+4px)] origin-bottom'
          : 'origin-top translate-y-1',
      )}
    >
      <div
        tabIndex={-1}
        className={clsx(
          'shadow-md',
          'rounded-md border border-slate-300 dark:border-slate-600',
          'bg-slate-50 dark:bg-slate-800 dark:text-slate-400',
        )}
      >
        {withSearch && (
          <div className="mb-2 border-b border-slate-300 p-2 dark:border-slate-600">
            <Input
              name="search"
              placeholder="Search categories..."
              iconName="search"
              padding="sm"
            />
          </div>
        )}
        <div
          className={clsx(
            withSearch ? 'max-h-60' : 'max-h-75',
            'scrollbar grid gap-1 overflow-y-auto p-2',
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
    </div>
  );
}
