import clsx from 'clsx';
import { useTheme } from '@/hooks/useTheme';
import SelectItem from './SelectItem';

interface SelectContentProps {
  id: string;
  label?: string;
  data: string[];
  isOpen: boolean;
  selectedItem: string;
  position: 'top' | 'bottom';
  onSelect: (option: string) => void;
}

export default function SelectContent({
  id,
  label,
  data,
  isOpen,
  selectedItem,
  position,
  onSelect,
}: SelectContentProps) {
  const { theme } = useTheme();
  return (
    <div
      id={`select-list-${id}`}
      role="listbox"
      className={clsx(
        'absolute z-50 w-full text-sm',
        'transition-all duration-400 ease-in',
        isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
        position === 'top'
          ? 'bottom-[calc(100%+4px)] origin-bottom'
          : 'origin-top translate-y-1',
      )}
    >
      <div
        tabIndex={-1}
        className={clsx(
          'scrollbar grid max-h-[300px] gap-1 p-2 shadow-md',
          'rounded-md border-[1px] border-slate-300 dark:border-slate-600',
          'overflow-y-auto bg-slate-50 dark:bg-slate-800 dark:text-slate-400',
          theme === 'dark' ? 'scrollbar-dark' : '',
        )}
      >
        {label && (
          <SelectItem
            key={'all'}
            option={'all'}
            isOpen={isOpen}
            selectedItem={selectedItem}
            onSelect={onSelect}
            label={label}
          />
        )}
        {data.map((filter) => (
          <SelectItem
            key={filter}
            option={filter}
            isOpen={isOpen}
            selectedItem={selectedItem}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
