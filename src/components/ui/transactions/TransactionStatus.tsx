import clsx from 'clsx';
import { transactionStatus } from '@/lib/constants/ui';

const style = {
  failed: 'bg-red-500 text-slate-100 dark:bg-red-700',
  pending: 'bg-yellow-300 text-slate-700 dark:bg-yellow-500',
  completed: 'bg-green-700 text-slate-100 dark:bg-green-900',
};

export default function TransactionStatus({
  status,
}: {
  status: keyof typeof transactionStatus;
}) {
  return (
    <div className={clsx('rounded-md px-2 py-1 text-center', style[status])}>
      {status.replace(status[0], status[0].toUpperCase())}
    </div>
  );
}
