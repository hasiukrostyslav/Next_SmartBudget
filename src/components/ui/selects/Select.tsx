'use client';

import clsx from 'clsx';
import { useSelect } from '@/hooks/useSelect';
import SelectContent from './SelectContent';
import Icon from '../Icon';
import SelectDisplay from './SelectDisplay';

interface SelectProps {
  name: string;
  data: string[];
  label?: string;
  defaultValue?: string;
  className?: string;
  width?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  color?: 'transparent' | 'blue';
  contentPosition?: 'top' | 'bottom';
  placeholder?: string;
}

const styles = {
  width: {
    sm: 'min-w-18 gap-2',
    md: 'min-w-38 gap-5',
    lg: 'min-w-44 gap-5',
  },
  padding: { sm: 'py-1.5', md: 'py-2', lg: 'py-2.5' },
  color: {
    blue: 'border-blue-300 bg-blue-200/50',
    transparent: 'border-slate-300',
  },
};

export default function Select({
  name,
  className,
  label,
  data,
  defaultValue,
  width = 'md',
  padding = 'sm',
  color = 'transparent',
  contentPosition = 'bottom',
  placeholder,
}: SelectProps) {
  const {
    id,
    isOpen,
    selectedItem,
    selectRef,
    handleBlur,
    handleSelect,
    handleToggle,
  } = useSelect({ defaultValue });

  return (
    <div
      role="combobox"
      aria-haspopup="listbox"
      aria-controls={`select-list-${id}`}
      aria-labelledby={`select-label-${id}`}
      aria-expanded={isOpen}
      ref={selectRef}
      className={clsx('relative', className)}
      onBlur={handleBlur}
    >
      <button
        id={`select-label-${id}`}
        name={name}
        aria-haspopup="listbox"
        aria-controls={`select-list-${id}`}
        aria-expanded={isOpen}
        type="button"
        onClick={handleToggle}
        className={clsx(
          'flex items-center justify-between px-2.5 text-sm font-medium',
          'outline-input rounded-md border-[1px] text-slate-700',
          'dark:border-slate-500 dark:bg-slate-800 dark:text-slate-400',
          styles.width[width],
          styles.color[color],
          styles.padding[padding],
        )}
      >
        <SelectDisplay
          selectedItem={selectedItem}
          defaultValue={defaultValue}
          label={label}
          placeholder={placeholder}
        />
        <Icon
          size={16}
          name="chevron-down"
          className={clsx(
            'transform transition-transform duration-400 ease-in-out',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        />
      </button>

      <SelectContent
        position={contentPosition}
        id={id}
        isOpen={isOpen}
        data={data}
        label={label}
        selectedItem={selectedItem}
        onSelect={handleSelect}
      />
    </div>
  );
}
