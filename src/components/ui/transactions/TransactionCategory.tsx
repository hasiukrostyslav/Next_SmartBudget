import { transactionCategories } from '@/lib/constants/ui';
import clsx from 'clsx';

interface TransactionCategoryProps {
  category: (typeof transactionCategories)[number]['name'];
}

export default function TransactionCategory({
  category,
}: TransactionCategoryProps) {
  return (
    <div>
      <span
        className={clsx(
          'inline-block rounded-xl px-2.5 py-1',
          `${transactionCategories.find((c) => c.name === category.toLowerCase())?.color}`,
        )}
      >
        {category
          .split(' ')
          .map((word) => word.replace(word[0], word[0].toUpperCase()))
          .join(' ')}
      </span>
    </div>
  );
}
