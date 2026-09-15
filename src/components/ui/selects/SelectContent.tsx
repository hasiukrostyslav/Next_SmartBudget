import clsx from 'clsx';

import { SelectOption } from '@/types/types';

import { matchesQuery } from '@/lib/utils/utils';
import { useSearchInput } from '@/hooks/useSearchInput';

import EmptySearchResult from '../feedback/EmptySearchResult';
import Input from '../inputs/Input';
import PopoverPanel from './PopoverPanel';
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
  const { searchQuery, role, handleChange, handleClear } = useSearchInput({
    isContentExpanded,
  });

  const query = searchQuery.trim().toLowerCase();
  const filteredOptions = options
    .filter((option) => matchesQuery(query, option.label, option.description))
    .toSorted((a, b) =>
      a.label.localeCompare(b.label, undefined, { numeric: true }),
    );

  return (
    <PopoverPanel
      id={id}
      isContentExpanded={isContentExpanded}
      position={position}
      widthExpandedTo={widthExpandedTo}
      expandedAlign={expandedAlign}
    >
      {withSearch && (
        <div className="mb-2 border-b border-slate-300 p-2 dark:border-slate-600">
          <Input
            name="search"
            placeholder="Search categories..."
            ariaLabel="Search options"
            iconName="search"
            padding="sm"
            value={searchQuery}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            trailingButton={{ role, onClick: handleClear }}
          />
        </div>
      )}
      <div
        role="listbox"
        className={clsx(
          withSearch ? 'max-h-60' : 'max-h-75',
          'scrollbar grid gap-1 overflow-y-auto p-2',
        )}
      >
        {withSearch && filteredOptions.length === 0 ? (
          <EmptySearchResult query={searchQuery} onClick={handleClear} />
        ) : (
          filteredOptions.map((option) => (
            <SelectItem
              key={option.value}
              option={option}
              onSelect={onSelect}
              selectedValue={selectedValue}
              showSelectedOption={showSelectedOption}
              isContentExpanded={isContentExpanded}
            />
          ))
        )}
      </div>
    </PopoverPanel>
  );
}
