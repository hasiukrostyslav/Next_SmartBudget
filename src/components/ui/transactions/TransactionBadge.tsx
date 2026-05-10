import { transactionCategories } from '@/lib/constants/ui';
import Icon from '../Icon';
import clsx from 'clsx';

interface TransactionBadgeProps {
  category: string;
  name: string;
}

export default function TransactionBadge({
  category,
  name,
}: TransactionBadgeProps) {
  const convertedCategory = transactionCategories.find(
    (el) => el.name === category.toLowerCase(),
  )?.icon;

  return (
    <div className="flex gap-2 px-1.5">
      <span
        className={clsx(
          'rounded-full border p-1.5',
          `${transactionCategories.find((c) => c.name === category.toLowerCase())?.color}`,
        )}
      >
        <Icon name={convertedCategory || 'banknote'} size={20} />
      </span>
      <div className="flex items-center">
        <span className="font-medium">{name}</span>
      </div>
    </div>
  );
}
