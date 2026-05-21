import { TRANSACTION_CATEGORIES } from '@/lib/constants/ui';
import Icon from '../Icon';
import clsx from 'clsx';

interface TransactionBadgeProps {
  category: keyof typeof TRANSACTION_CATEGORIES;
  name: string;
}

export default function TransactionBadge({
  category,
  name,
}: TransactionBadgeProps) {
  return (
    <div className="flex gap-2 px-1.5">
      <span
        className={clsx(
          'rounded-full border-2 p-1.5',
          TRANSACTION_CATEGORIES[category].style.badge,
        )}
      >
        <Icon name={TRANSACTION_CATEGORIES[category].icon || 'banknote'} size={20} />
      </span>
      <div className="flex items-center">
        <span className="font-medium">{name}</span>
      </div>
    </div>
  );
}
