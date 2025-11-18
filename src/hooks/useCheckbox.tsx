import { TransactionItem } from '@/types/types';
import { useEffect, useState } from 'react';

type useCheckboxProps = TransactionItem[];

export function useCheckbox(list: useCheckboxProps) {
  const [isBulkSelect, setIsBulkSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (isBulkSelect) setSelectedItems(list.map((d) => d.transactionId));
    else setSelectedItems([]);
  }, [isBulkSelect, list]);

  const toggleSelect = (id: string) =>
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const toggleBulkSelect = () => setIsBulkSelect(!isBulkSelect);

  return { selectedItems, isBulkSelect, toggleSelect, toggleBulkSelect };
}
