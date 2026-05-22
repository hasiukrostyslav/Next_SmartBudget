import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TransactionItem } from '@/types/types';
import {
  Currency,
  Status,
  TransactionCategories,
  TransactionType,
} from '@/lib/constants/enums';

type useCheckboxProps = TransactionItem[];

export function useCheckbox(list: useCheckboxProps) {
  const [isBulkSelect, setIsBulkSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    {
      itemId: string;
      itemName: string;
      status: Status;
      category: TransactionCategories;
      type: TransactionType;
      amount: number;
      currency: Currency;
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
          category: d.transactionCategory,
          type: d.transactionType,
          amount: d.amount,
          currency: d.currency,
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
    status: Status,
    category: TransactionCategories,
    type: TransactionType,
    amount: number,
    currency: Currency,
  ) =>
    setSelectedItems((prev) =>
      prev.find((i) => i.itemId === id)
        ? prev.filter((i) => i.itemId !== id)
        : [
            ...prev,
            {
              itemId: id,
              itemName: name,
              status,
              type,
              amount,
              currency,
              category,
            },
          ],
    );

  const toggleBulkSelect = () => setIsBulkSelect(!isBulkSelect);
  const bulkSelect = () => {
    setIsBulkSelect(true);
    setSelectedItems(
      list.map((d) => ({
        itemId: d.transactionId,
        itemName: d.transactionName,
        status: d.status,
        category: d.transactionCategory,
        type: d.transactionType,
        amount: d.amount,
        currency: d.currency,
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
