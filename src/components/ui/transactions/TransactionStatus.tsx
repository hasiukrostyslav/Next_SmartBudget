import clsx from 'clsx';

const style = {
  failed: 'bg-red-500 text-slate-100 dark:bg-red-700',
  pending: 'bg-yellow-300 text-slate-700 dark:bg-yellow-500',
  complete: 'bg-green-700 text-slate-100 dark:bg-green-900',
};

export default function TransactionStatus({
  status,
}: {
  status: 'complete' | 'pending' | 'failed';
}) {
  return (
    <div className={clsx('rounded-md px-2 py-1 text-center', style[status])}>
      {status.replace(status[0], status[0].toUpperCase())}
    </div>
  );
}
