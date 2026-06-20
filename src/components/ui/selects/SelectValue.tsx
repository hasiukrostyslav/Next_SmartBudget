interface SelectDisplayProps {
  selectedValue: string | number | undefined;
  bulkLabel: string;
  placeholder?: string;
}

export default function SelectDisplay({
  selectedValue,
  bulkLabel,
  placeholder,
}: SelectDisplayProps) {
  if (placeholder && !selectedValue) {
    return (
      <span className="text-slate-300 dark:text-slate-700">{placeholder}</span>
    );
  }

  if (!selectedValue) return null;

  let renderOption;
  if (typeof selectedValue === 'number') {
    renderOption = selectedValue;
  } else if (selectedValue === 'all') {
    renderOption = `All ${bulkLabel.at(0)?.toUpperCase() + bulkLabel.slice(1)}`;
  } else {
    renderOption = selectedValue
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join(' ');
  }

  return <span>{renderOption}</span>;
}
