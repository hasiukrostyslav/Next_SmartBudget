import clsx from 'clsx';
import getSymbolFromCurrency from 'currency-symbol-map';

interface TransactionAmountProps {
  type: string;
  amount: number;
  currency: string;
}

export default function TransactionAmount({
  type,
  amount,
  currency,
}: TransactionAmountProps) {
  const formattedAmount = new Intl.NumberFormat('ukr').format(amount);
  return (
    <div
      className={clsx(
        'flex',
        type === 'Income' ? 'text-green-600' : 'text-red-600',
      )}
    >
      <span>{type === 'Income' ? '+' : '-'}</span>
      <span className="mr-1 ml-0.5">{formattedAmount}</span>
      <span>{getSymbolFromCurrency(currency)}</span>
    </div>
  );
}
