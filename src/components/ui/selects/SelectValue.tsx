import { SelectOption } from '@/types/types';

import SelectOptionItem from './SelectOptionItem';

interface SelectDisplayProps {
  selectedValue?: SelectOption;
  placeholder?: string;
}

export default function SelectDisplay({
  selectedValue,
  placeholder,
}: SelectDisplayProps) {
  if (placeholder && !selectedValue) {
    return (
      <span className="text-slate-300 dark:text-slate-700">{placeholder}</span>
    );
  }

  if (!selectedValue) return null;

  return <SelectOptionItem option={selectedValue} context="value" />;
}
