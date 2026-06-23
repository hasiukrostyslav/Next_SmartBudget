interface SelectDisplayProps {
  selectedValue: string | number | undefined;
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

  let visibleOption;
  if (typeof selectedValue === 'number') {
    visibleOption = selectedValue;
  } else {
    visibleOption = selectedValue
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(' ');
  }

  return <span>{visibleOption}</span>;
}
