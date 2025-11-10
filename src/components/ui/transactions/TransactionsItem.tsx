import clsx from 'clsx';
import CheckBox from '../inputs/CheckBox';
import Icon from '../Icon';

export default function TransactionsItem() {
  return (
    <div
      className={clsx(
        'col-span-full grid grid-cols-subgrid items-center text-xs',
        'border-t tracking-wide text-slate-800 dark:text-slate-400',
        'mr-3 border-slate-300 px-1 py-2 dark:border-slate-700',
      )}
    >
      <CheckBox name="" />
      <div className="flex gap-2 px-1.5">
        <span className="rounded-full bg-green-400 p-1.5">
          <Icon name="income" size={20} className="dark:text-slate-800" />
        </span>
        <div className="flex flex-col">
          <span className="font-medium">Bonus Payment</span>
          <span className="text-slate-500 dark:text-slate-500">Income</span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-1.5">
        <Icon name="payment" />
        <span>Platinum Plus Visa</span>
      </div>
      <div className="flex flex-col px-1.5">
        <span className="font-medium">05.11.2025</span>
        <span className="text-slate-500 dark:text-slate-500">21:00</span>
      </div>
      <div className="px-1.5 text-green-600">+$350.54</div>
      <div className="px-1.5">My salary</div>
      <div
        className={clsx(
          'rounded-md bg-green-700 px-2 py-1 text-slate-100 dark:bg-green-900',
        )}
      >
        Complete
      </div>
    </div>
  );
}
