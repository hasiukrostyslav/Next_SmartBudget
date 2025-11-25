import { TransactionItem } from '@/types/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type useCheckboxProps = TransactionItem[];

export function useCheckbox(list: useCheckboxProps) {
  const [isBulkSelect, setIsBulkSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isBulkSelect) setSelectedItems(list.map((d) => d.transactionId));
    else setSelectedItems([]);
  }, [isBulkSelect, list]);

  useEffect(() => {
    setIsBulkSelect(false);
    setSelectedItems([]);
  }, [searchParams]);

  const toggleSelect = (id: string) =>
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const toggleBulkSelect = () => setIsBulkSelect(!isBulkSelect);
  const bulkSelect = () => {
    setIsBulkSelect(true);
    setSelectedItems(list.map((d) => d.transactionId));
  };
  const bulkUnSelect = () => {
    setIsBulkSelect(false);
    setSelectedItems([]);
  };

  return {
    selectedItems,
    isBulkSelect,
    toggleSelect,
    toggleBulkSelect,
    bulkSelect,
    bulkUnSelect,
  };
}
