import clsx from 'clsx';
import { TRANSACTION_CATEGORIES } from '@/lib/constants/ui';

interface TransactionCategoryProps {
  category: keyof typeof TRANSACTION_CATEGORIES;
}

export default function TransactionCategory({
  category,
}: TransactionCategoryProps) {
  return (
    <div>
      <span
        className={clsx(
          'inline-block rounded-xl border-2 px-2.5 py-1',
          TRANSACTION_CATEGORIES[category].style.badge,
        )}
      >
        {TRANSACTION_CATEGORIES[category].text.header}
      </span>
    </div>
  );
}
