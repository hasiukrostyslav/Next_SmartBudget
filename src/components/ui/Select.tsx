'use client';

import clsx from 'clsx';
import { useSelect } from '@/hooks/useSelect';
import Icon from './Icon';
import SelectContent from './SelectContent';

interface SelectProps {
  name: string;
  heading: string;
  className?: string;
  data: string[];
}

export default function Select({
  name,
  className,
  heading,
  data,
}: SelectProps) {
  const {
    id,
    isOpen,
    selectedItem,
    selectRef,
    handleBlur,
    handleSelect,
    handleToggle,
  } = useSelect();

  return (
    <form
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
        aria-haspopup="listbox"
        aria-controls={`select-list-${id}`}
        aria-expanded={isOpen}
        type="button"
        onClick={handleToggle}
        className={clsx(
          'flex min-w-38 items-center justify-between gap-5 px-2.5 py-1.5 text-sm font-medium',
          'outline-input rounded-md border-[1px] border-slate-300 text-slate-700',
          'dark:border-slate-500 dark:bg-slate-800 dark:text-slate-400',
        )}
        name={name}
      >
        <span>
          {selectedItem === 'all'
            ? heading
            : selectedItem.replace(
                selectedItem[0],
                selectedItem[0].toUpperCase(),
              )}
        </span>
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
        id={id}
        isOpen={isOpen}
        data={data}
        heading={heading}
        selectedItem={selectedItem}
        onSelect={handleSelect}
      />
    </form>
  );
}
