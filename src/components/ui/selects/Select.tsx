'use client';

import { SelectOption } from '@/types/types';

import { SELECT_CONFIG } from '@/lib/constants/components';
import { useSelect } from '@/hooks/useSelect';

import SelectContent from './SelectContent';
import SelectTrigger from './SelectTrigger';
import SelectValue from './SelectValue';

interface SelectProps {
  label: string;
  param?: string;
  options: SelectOption[];
  defaultValue?: string | number;
  placeholder?: string;
  padding?: keyof typeof SELECT_CONFIG.padding;
  variant?: keyof typeof SELECT_CONFIG.variant;
  showSelectedOption: boolean;
  contentPosition?: 'top' | 'bottom';
  disabled?: boolean;
  onValueChange?: (value: string | number) => void;
}

export default function Select({
  label,
  param,
  options,
  defaultValue,
  placeholder,
  padding = 'sm',
  variant = 'primary',
  showSelectedOption,
  contentPosition = 'bottom',
  disabled,
  onValueChange,
}: SelectProps) {
  const {
    id,
    isContentExpanded,
    selectedValue,
    selectRef,
    handleBlur,
    handleSelect,
    handleToggleExpanded,
  } = useSelect({
    defaultValue,
    param,
    onValueChange,
  });

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
        onSelect={handleSelect}
      />
    </div>
  );
}
