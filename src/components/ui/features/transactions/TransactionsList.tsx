'use client';

import clsx from 'clsx';

import { TransactionItem } from '@/types/types';

import { useCheckbox } from '@/hooks/useCheckbox';

import SectionWrapper from '@/components/layouts/SectionWrapper';

import BulkToolbar from '../../modals/BulkToolbar';
import TransactionBulkActionButtons from './TransactionBulkActionButtons';
import TransactionsItem from './TransactionsItem';
import TransactionsSort from './TransactionsSort';

export default function TransactionsList({
  data,
}: {
  data: TransactionItem[];
}) {
  const {
    selectedIds,
    isAllSelected,
    toggleSelect,
    toggleSelectAll,
    selectAll,
    deselectAll,
  } = useCheckbox(data.map((el) => el.transactionId));

  return (
    <SectionWrapper className="flex h-full min-h-0 flex-col overflow-x-auto overflow-y-hidden">
      <div
        role="table"
        aria-label="Transactions"
        className={clsx(
          'relative grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-x-4',
          // Nine columns don't fit a phone; the table scrolls sideways instead.
          'min-w-[60rem]',
          'grid-cols-[auto_1fr_1fr_1fr_auto_minmax(6rem,auto)_1fr_auto_auto]',
        )}
      >
        <TransactionsSort
          isAllSelected={isAllSelected}
          onToggleSelectAll={toggleSelectAll}
        />
        <div
          role="rowgroup"
          className={clsx(
            'col-span-full grid auto-rows-min grid-cols-subgrid',
            'scrollbar overflow-x-hidden overflow-y-auto',
          )}
        >
          {data.map((item) => (
            <TransactionsItem
              key={item.transactionId}
              item={item}
              checked={selectedIds.has(item.transactionId)}
              onToggleSelect={() => toggleSelect(item.transactionId)}
            />
          ))}
        </div>
      </div>

      {/* Outside role="table": a table may only contain rows and row groups.
          The toolbar is fixed to the viewport, so where it sits in the DOM
          doesn't move it. The status line is always rendered, so the count is
          announced when a selection starts, changes and ends. */}
      <p role="status" className="sr-only">
        {selectedIds.size > 0 ? `${selectedIds.size} selected` : ''}
      </p>
      <BulkToolbar
        selectedNumber={selectedIds.size}
        isShown={selectedIds.size > 0}
        isAllSelected={isAllSelected}
        onSelectAll={selectAll}
        onDeselectAll={deselectAll}
      >
        <TransactionBulkActionButtons
          selectedItems={data.filter((item) =>
            selectedIds.has(item.transactionId),
          )}
        />
      </BulkToolbar>
    </SectionWrapper>
  );
}
