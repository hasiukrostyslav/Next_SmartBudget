'use client';

import clsx from 'clsx';
import { useCheckbox } from '@/hooks/useCheckbox';
import TransactionsItem from './TransactionsItem';
import TransactionsSort from './TransactionsSort';
import { TransactionItem } from '@/types/types';

export default function TransactionsList({
  data,
}: {
  data: TransactionItem[];
}) {
  const { selectedItems, isBulkSelect, toggleSelect, toggleBulkSelect } =
    useCheckbox(data);

  return (
    <div
      className={clsx(
        'grid auto-rows-min gap-x-4',
        'grid-cols-[auto_1fr_1fr_auto_minmax(6rem,auto)_1fr_auto_auto]',
      )}
    >
      <TransactionsSort
        isBulkSelect={isBulkSelect}
        toggleBulkSelect={toggleBulkSelect}
      />
      <div
        className={clsx(
          'col-span-full grid grid-cols-subgrid',
          'h-55vh h-65vh overflow-y-auto',
        )}
      >
        {data.map((item) => (
          <TransactionsItem
            key={item.transactionId}
            item={item}
            checked={selectedItems.includes(item.transactionId)}
            toggleSelect={() => toggleSelect(item.transactionId)}
          />
        ))}
      </div>
    </div>
  );
}
