'use client';

import clsx from 'clsx';

interface SelectItemProps {
  selectedItem: string;
  option: string;
  isOpen: boolean;
  label?: string;
  onSelect: (option: string) => void;
}

export default function SelectItem({
  selectedItem,
  option,
  isOpen,
  onSelect,
  label,
}: SelectItemProps) {
  return (
    <button
      role="option"
      tabIndex={isOpen ? 0 : -1}
      aria-selected={selectedItem === option}
      disabled={selectedItem === option}
      onClick={() => onSelect(option)}
      type="button"
      className={clsx(
        'outline-input flex w-full rounded-md px-1.5 py-1',
        'hover:bg-blue-200/50 dark:hover:bg-slate-600/40',
        selectedItem === option ? 'hidden' : '',
      )}
    >
      {option === 'all'
        ? label
        : option.replace(option[0], option[0].toUpperCase())}
    </button>
  );
}
