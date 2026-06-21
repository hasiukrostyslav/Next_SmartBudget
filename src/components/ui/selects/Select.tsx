'use client';

import clsx from 'clsx';

import { SELECT_CONFIG } from '@/lib/constants/components';
import { useSelect } from '@/hooks/useSelect';

import SelectContent from './SelectContent';
import SelectTrigger from './SelectTrigger';
import SelectValue from './SelectValue';

interface SelectProps {
  label: string;
  param?: string;
  options: (string | number)[];
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
  width?: keyof typeof SELECT_CONFIG.width;
  padding?: keyof typeof SELECT_CONFIG.padding;
  variant?: keyof typeof SELECT_CONFIG.variant;
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
  className,
  width = 'md',
  padding = 'sm',
  variant = 'primary',
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
      className={clsx('relative', className)}
      onBlur={handleBlur}
    >
      <SelectTrigger
        id={id}
        label={label}
        width={width}
        padding={padding}
        variant={variant}
        disabled={disabled}
        isContentExpanded={isContentExpanded}
        onClick={handleToggleExpanded}
      >
        <SelectValue
          selectedValue={selectedValue}
          bulkLabel={label}
          placeholder={placeholder}
        />
      </SelectTrigger>

      <SelectContent
        id={id}
        options={options}
        label={label}
        defaultValue={defaultValue}
        selectedValue={selectedValue}
        isContentExpanded={isContentExpanded}
        position={contentPosition}
        onSelect={handleSelect}
      />
    </div>
  );
}
