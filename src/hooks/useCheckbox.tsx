import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { transactionStatus } from '@/lib/constants/ui';
import { TransactionItem } from '@/types/types';

type useCheckboxProps = TransactionItem[];

export function useCheckbox(list: useCheckboxProps) {
  const [isBulkSelect, setIsBulkSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    {
      itemId: string;
      itemName: string;
      status: keyof typeof transactionStatus;
    }[]
  >([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isBulkSelect)
      setSelectedItems(
        list.map((d) => ({
          itemId: d.transactionId,
          itemName: d.transactionName,
          status: d.status,
        })),
      );
    else setSelectedItems([]);
  }, [isBulkSelect, list]);

  useEffect(() => {
    setIsBulkSelect(false);
    setSelectedItems([]);
  }, [searchParams]);

  useEffect(() => {
    if (!selectedItems.length) setIsBulkSelect(false);
  }, [selectedItems.length]);

  const toggleSelect = (
    id: string,
    name: string,
    status: keyof typeof transactionStatus,
  ) =>
    setSelectedItems((prev) =>
      prev.find((i) => i.itemId === id)
        ? prev.filter((i) => i.itemId !== id)
        : [...prev, { itemId: id, itemName: name, status: status }],
    );

  const toggleBulkSelect = () => setIsBulkSelect(!isBulkSelect);
  const bulkSelect = () => {
    setIsBulkSelect(true);
    setSelectedItems(
      list.map((d) => ({
        itemId: d.transactionId,
        itemName: d.transactionName,
        status: d.status,
      })),
    );
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
