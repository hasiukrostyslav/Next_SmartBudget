'use client';

import clsx from 'clsx';
import { useCheckbox } from '@/hooks/useCheckbox';
import TransactionsItem from './TransactionsItem';
import TransactionsSort from './TransactionsSort';
import BulkToolbar from '../BulkToolbar';
import { TransactionItem } from '@/types/types';

export default function TransactionsGrid({
  data,
}: {
  data: TransactionItem[];
}) {
  const {
    selectedItems,
    isBulkSelect,
    toggleSelect,
    toggleBulkSelect,
    bulkSelect,
    bulkUnSelect,
  } = useCheckbox(data);

  console.log(
    data.map((el) => el.status).toSorted((a, b) => a.localeCompare(b)),
  );

  return (
    <div
      className={clsx(
        'relative grid auto-rows-min gap-x-4',
        'grid-cols-[auto_1fr_1fr_auto_minmax(6rem,auto)_1fr_auto_auto]',
      )}
    >
      <TransactionsSort
        isBulkSelect={isBulkSelect}
        toggleBulkSelect={toggleBulkSelect}
      />
      <div
        className={clsx(
          'col-span-full grid auto-rows-min grid-cols-subgrid',
          'h-55vh h-65vh scrollbar overflow-y-auto',
        )}
      >
        {data.map((item) => (
          <TransactionsItem
            key={item.transactionId}
            item={item}
            checked={selectedItems.some((i) => i.itemId === item.transactionId)}
            toggleSelect={() =>
              toggleSelect(
                item.transactionId,
                item.transactionName,
                item.status,
              )
            }
          />
        ))}
      </div>
      <BulkToolbar
        selectedNumber={selectedItems.length}
        isShown={selectedItems.length > 0}
        allSelected={selectedItems.length === data.length && isBulkSelect}
        bulkSelect={bulkSelect}
        bulkUnSelect={bulkUnSelect}
        selectedItems={selectedItems}
      />
    </div>
  );
}
