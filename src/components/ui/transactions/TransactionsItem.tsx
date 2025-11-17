import clsx from 'clsx';
import CheckBox from '../inputs/CheckBox';
import Icon from '../Icon';
import { TransactionItem } from '@/types/types';
import { transactionCategories } from '@/lib/constants/ui';
import IconColorful from '../IconColorful';
import ButtonIcon from '../buttons/ButtonIcon';

interface TransactionsItemProps {
  item: TransactionItem;
}

export default function TransactionsItem({ item }: TransactionsItemProps) {
  const {
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

  const category = transactionCategories.find(
    (el) => el.name === transactionCategory,
  )?.icon;

  const date = new Intl.DateTimeFormat('uk').format(createdAt);
  const time = new Intl.DateTimeFormat('uk', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(createdAt);
  const formattedAmount = new Intl.NumberFormat('uk', {
    style: 'currency',
    currency,
  }).format(amount);

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
      <CheckBox name="" />
      <div className="flex gap-2 px-1.5">
        <span className="rounded-full bg-green-400 p-1.5">
          <Icon name={category} size={20} className="dark:text-slate-800" />
        </span>
        <div className="flex flex-col">
          <span className="font-medium">{transactionName}</span>
          <span className="text-slate-500 dark:text-slate-500">
            {transactionType}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-1.5">
        {paymentMethod === 'Cash' ? (
          <Icon name="banknote" />
        ) : (
          <IconColorful name="Mastercard" className="w-8" />
        )}

        <span>{paymentMethod}</span>
      </div>
      <div className="flex flex-col px-1.5">
        <span className="font-medium">{date}</span>
        <span className="text-slate-500 dark:text-slate-500">{time}</span>
      </div>
      <div
        className={clsx(
          'px-1.5',
          transactionType === 'Income' ? 'text-green-600' : 'text-red-600',
        )}
      >
        <span>{transactionType === 'Income' ? '+' : '-'}</span>
        <span>{formattedAmount}</span>
      </div>
      <div className="px-1.5">{description}</div>
      <div
        className={clsx(
          'rounded-md px-2 py-1 text-center',
          status === 'Complete'
            ? 'bg-green-700 text-slate-100 dark:bg-green-900'
            : 'bg-yellow-500 text-slate-700',
        )}
      >
        {status}
      </div>
      <div className="flex text-slate-500">
        <ButtonIcon
          iconName="copy"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
        />
        <ButtonIcon
          iconName="edit"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
        />
        <ButtonIcon
          iconName="delete"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
        />
      </div>
    </div>
  );
}
