import clsx from 'clsx';
import { getAllTransactions } from '@/lib/actions/transactionActions';
import TransactionsItem from './TransactionsItem';
import TransactionsSort from './TransactionsSort';

export default async function TransactionsList() {
  const result = await getAllTransactions();

  return (
    <div
      className={clsx(
        'grid auto-rows-min gap-x-4',
        'grid-cols-[auto_1fr_1fr_auto_minmax(6rem,auto)_1fr_auto_auto]',
      )}
    >
      <TransactionsSort />
      <div
        className={clsx(
          'col-span-full grid grid-cols-subgrid',
          'h-55vh h-65vh overflow-y-auto',
        )}
      >
        {result.data?.map((item) => (
          <TransactionsItem key={item.transactionId} item={item} />
        ))}
      </div>
    </div>
  );
}
