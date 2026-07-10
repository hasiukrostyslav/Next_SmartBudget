import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { TransactionItem } from '@/types/types';

import {
  Currency,
  Status,
  TransactionCategories,
  TransactionType,
} from '@/lib/constants/enums';

export function useCheckbox(list: TransactionItem[]) {
  const [isAllSelected, setIsAllSelected] = useState(false);
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
    if (isAllSelected)
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
  }, [isAllSelected, list]);

  useEffect(() => {
    setIsAllSelected(false);
    setSelectedItems([]);
  }, [searchParams]);

  useEffect(() => {
    if (!selectedItems.length) setIsAllSelected(false);
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

  const toggleSelectAll = () => setIsAllSelected(!isAllSelected);
  const selectAll = () => {
    setIsAllSelected(true);
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
  const deselectAll = () => {
    setIsAllSelected(false);
    setSelectedItems([]);
  };

  return {
    selectedItems,
    isAllSelected,
    toggleSelect,
    toggleSelectAll,
    selectAll,
    deselectAll,
  };
}
