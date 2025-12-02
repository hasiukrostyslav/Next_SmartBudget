import clsx from 'clsx';

interface TransactionAmountProps {
  type: string;
  amount: number;
}

export default function TransactionAmount({
  type,
  amount,
}: TransactionAmountProps) {
  const formattedAmount = new Intl.NumberFormat('ukr').format(amount);
  return (
    <div
      className={clsx(
        'px-1.5',
        type === 'Income' ? 'text-green-600' : 'text-red-600',
      )}
    >
      <span>{type === 'Income' ? '+ ' : '- '}</span>
      <span>{formattedAmount}</span>
    </div>
  );
}
