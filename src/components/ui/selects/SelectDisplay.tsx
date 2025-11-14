interface SelectDisplayProps {
  selectedItem: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
}

export default function SelectDisplay({
  selectedItem,
  defaultValue,
  label,
  placeholder,
}: SelectDisplayProps) {
  if (placeholder && !label && !defaultValue && selectedItem === 'all') {
    return (
      <span className="text-slate-300 dark:text-slate-700">{placeholder}</span>
    );
  }

  return (
    <span>
      {selectedItem === 'all' && !defaultValue
        ? label
        : defaultValue === selectedItem
          ? defaultValue
          : selectedItem.replace(
              selectedItem[0],
              selectedItem[0].toUpperCase(),
            )}
    </span>
  );
}
