import { transactionCategories } from '@/lib/constants/ui';
import Icon from '../Icon';

interface TransactionBadgeProps {
  category: string;
  name: string;
  type: string;
}

export default function TransactionBadge({
  category,
  name,
  type,
}: TransactionBadgeProps) {
  const convertedCategory = transactionCategories.find(
    (el) => el.name === category,
  )?.icon;

  return (
    <div className="flex gap-2 px-1.5">
      <span className="rounded-full bg-green-300 p-1.5 dark:bg-green-400">
        <Icon
          name={convertedCategory || 'banknote'}
          size={20}
          className="dark:text-slate-800"
        />
      </span>
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-slate-500 dark:text-slate-500">{type}</span>
      </div>
    </div>
  );
}
