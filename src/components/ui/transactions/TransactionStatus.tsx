import clsx from 'clsx';
import { STATUS_CONFIG } from '@/lib/constants/ui';

export default function TransactionStatus({
  status,
}: {
  status: keyof typeof STATUS_CONFIG;
}) {
  return (
    <div
      className={clsx(
        'rounded-md border px-2 py-1 text-center',
        STATUS_CONFIG[status].badge,
      )}
    >
      {status.at(0) + status.slice(1).toLowerCase()}
    </div>
  );
}
