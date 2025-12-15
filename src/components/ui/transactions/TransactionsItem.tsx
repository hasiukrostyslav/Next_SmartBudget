import clsx from 'clsx';
import { TransactionItem } from '@/types/types';
import CheckBox from '../inputs/CheckBox';
import TransactionBadge from './TransactionBadge';
import TransactionAccount from './TransactionAccount';
import TransactionDate from './TransactionDate';
import TransactionStatus from './TransactionStatus';
import TransactionActionButtons from './TransactionActionButtons';
import TransactionAmount from './TransactionAmount';

interface TransactionsItemProps {
  item: TransactionItem;
  checked: boolean;
  toggleSelect: (id: string, name: string) => void;
}

export default function TransactionsItem({
  item,
  checked,
  toggleSelect,
}: TransactionsItemProps) {
  const {
    transactionId,
    transactionCategory,
    transactionName,
    transactionType,
    paymentMethod,
    createdAt,
    currency,
    amount,
    description,
    status,
  } = item;

  return (
    <div
      className={clsx(
        'col-span-full grid grid-cols-subgrid items-center text-xs',
        'border-t tracking-wide text-slate-800 dark:text-slate-400',
        'border-slate-300 px-1 py-2 dark:border-slate-700',
        'visible-hover-show visible-hide hover:bg-blue-200 dark:hover:bg-blue-950',
        'next-sibling hover:rounded-md',
      )}
    >
      <CheckBox
        name={transactionName}
        checked={checked}
        onChange={() => toggleSelect(transactionId, transactionName)}
      />
      <TransactionBadge
        category={transactionCategory}
        name={transactionName}
        type={transactionType}
      />
      <TransactionAccount paymentMethod={paymentMethod} />
      <TransactionDate date={createdAt} />
      <TransactionAmount
        type={transactionType}
        amount={amount}
        currency={currency}
      />
      <div className="px-1.5">{description}</div>
      <TransactionStatus status={status} />
      <TransactionActionButtons
        item={{ id: transactionId, name: transactionName }}
      />
    </div>
  );
}
