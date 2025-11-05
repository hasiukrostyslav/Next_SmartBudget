import clsx from 'clsx';
import SelectItem from './SelectItem';

interface SelectContentProps {
  id: string;
  isOpen: boolean;
  heading: string;
  selectedItem: string;
  data: string[];
  onSelect: (option: string) => void;
}

export default function SelectContent({
  id,
  isOpen,
  selectedItem,
  onSelect,
  data,
  heading,
}: SelectContentProps) {
  return (
    <div
      id={`select-list-${id}`}
      role="listbox"
      className={clsx(
        'absolute w-full origin-top translate-y-1 text-sm',
        'transition-all duration-400 ease-in',
        isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0',
      )}
    >
      <div
        className={clsx(
          'grid max-h-[300px] gap-1 p-2 shadow-md',
          'rounded-md border-[1px] border-slate-300 dark:border-slate-600',
          'bg-slate-50 dark:bg-slate-800',
          data.length > 9 ? 'overflow-y-scroll' : '',
        )}
      >
        <SelectItem
          key={'all'}
          option={'all'}
          isOpen={isOpen}
          selectedItem={selectedItem}
          onSelect={onSelect}
          heading={heading}
        />
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
