'use client';

import clsx from 'clsx';

interface SelectItemProps {
  isContentExpanded: boolean;
  selectedValue: string | number | undefined;
  option: string | number;
  onSelect: (option: string | number) => void;
}

export default function SelectItem({
  isContentExpanded,
  selectedValue,
  option,
  onSelect,
}: SelectItemProps) {
  return (
    <button
      role="option"
      tabIndex={isContentExpanded ? 0 : -1}
      aria-selected={selectedValue === option}
      disabled={selectedValue === option}
      onClick={() => onSelect(option)}
      type="button"
      className={clsx(
        'outline-input flex w-full rounded-md px-1.5 py-1',
        'hover:bg-blue-200/50 dark:hover:bg-slate-600/40',
        selectedValue === option ? 'hidden' : '',
      )}
    >
      {typeof option === 'number'
        ? option
        : option
            .split(' ')
            .map((word) => word.replace(word[0], word[0].toUpperCase()))
            .join(' ')}
    </button>
  );
}
