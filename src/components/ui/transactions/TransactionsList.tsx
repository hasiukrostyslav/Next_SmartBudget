import clsx from 'clsx';
import TransactionsItem from './TransactionsItem';
import TransactionsSort from './TransactionsSort';

export default function TransactionsList() {
  return (
    <div
      className={clsx(
        'grid auto-rows-min gap-x-4',
        'grid-cols-[auto_1fr_1fr_auto_minmax(6rem,auto)_1fr_auto]',
      )}
    >
      <TransactionsSort />
      <div
        className={clsx(
          'col-span-full grid grid-cols-subgrid',
          'scrollbar max-h-[55vh] overflow-y-auto',
        )}
      >
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
        <TransactionsItem />
      </div>
    </div>
  );
}
