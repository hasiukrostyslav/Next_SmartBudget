'use client';

import clsx from 'clsx';

import CheckBox from '../../controls/CheckBox';
import TransactionsSortList from './TransactionsSortList';

interface TransactionsSortProps {
  isAllSelected: boolean;
  onToggleSelectAll: () => void;
}

// The header row of the transactions table.
export default function TransactionsSort({
  isAllSelected,
  onToggleSelectAll,
}: TransactionsSortProps) {
  return (
    <div
      role="row"
      className={clsx(
        'col-span-full mb-4 grid grid-cols-subgrid items-center px-2',
      )}
    >
      <div role="columnheader">
        <CheckBox
          name="bulk"
          label="Select all transactions on this page"
          checked={isAllSelected}
          onChange={onToggleSelectAll}
        />
      </div>

      <TransactionsSortList />

      <div role="columnheader">
        <span className="sr-only">Actions</span>
      </div>
    </div>
  );
}
