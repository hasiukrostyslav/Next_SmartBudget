'use client';

import { useSort } from '@/hooks/useSort';
import { transactionSortOptions } from '@/lib/constants/ui';
import SortButton from '../buttons/SortButton';

export default function TransactionsSortList() {
  const { sort, order, handleSort } = useSort();

  return (
    <>
      {transactionSortOptions.map((el) => (
        <SortButton
          key={el.label}
          name={el.name}
          label={el.label}
          isActive={el.label === sort}
          onClick={handleSort}
          order={order}
        />
      ))}
    </>
  );
}
