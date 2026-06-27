'use client';

import { SelectOption } from '@/types/types';

import { SELECT_CONFIG } from '@/lib/constants/components';
import { useSelectDropdown } from '@/hooks/useSelectDropdown';

import SelectContent from './SelectContent';
import SelectTrigger from './SelectTrigger';
import SelectValue from './SelectValue';

interface SelectProps {
  label: string;
  options: SelectOption[];
  selectedValue: string | number | undefined;
  placeholder?: string;
  padding?: keyof typeof SELECT_CONFIG.padding;
  variant?: keyof typeof SELECT_CONFIG.variant;
  showSelectedOption: boolean;
  groupPosition?: 'start' | 'end';
  contentPosition?: 'top' | 'bottom';
  contentWidthExpandedTo?: 'left' | 'right';
  disabled?: boolean;
  onSelect: (value: string | number) => void;
}

export default function Select({
  label,
  options,
  selectedValue,
  placeholder,
  padding = 'sm',
  variant = 'primary',
  showSelectedOption,
  groupPosition,
  contentPosition = 'bottom',
  contentWidthExpandedTo = 'left',
  disabled,
  onSelect,
}: SelectProps) {
  const {
    id,
    isContentExpanded,
    selectRef,
    handleBlur,
    handleSelect,
    handleToggleExpanded,
  } = useSelectDropdown({ onSelect });

  return (
    <div
      role="combobox"
      aria-haspopup="listbox"
      aria-controls={`select-list-${id}`}
      aria-labelledby={`select-label-${id}`}
      aria-expanded={isContentExpanded}
      ref={selectRef}
      className="relative"
      onBlur={handleBlur}
    >
      <SelectTrigger
        id={id}
        label={label}
        padding={padding}
        variant={variant}
        disabled={disabled}
        isContentExpanded={isContentExpanded}
        groupPosition={groupPosition}
        onClick={handleToggleExpanded}
      >
        <SelectValue
          selectedValue={options.find((el) => el.value === selectedValue)}
          placeholder={placeholder}
        />
      </SelectTrigger>

      <SelectContent
        id={id}
        options={options}
        selectedValue={selectedValue}
        isContentExpanded={isContentExpanded}
        showSelectedOption={showSelectedOption}
        position={contentPosition}
        widthExpandedTo={contentWidthExpandedTo}
        onSelect={handleSelect}
      />
    </div>
  );
}
