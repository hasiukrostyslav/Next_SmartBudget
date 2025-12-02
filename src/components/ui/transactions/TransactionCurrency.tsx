import clsx from 'clsx';
import getSymbolFromCurrency from 'currency-symbol-map';

interface TransactionAmountProps {
  type: string;
  currency: string;
}

export default function TransactionCurrency({
  type,
  currency,
}: TransactionAmountProps) {
  return (
    <div
      className={clsx(type === 'Income' ? 'text-green-600' : 'text-red-600')}
    >
      {getSymbolFromCurrency(currency)}
    </div>
  );
}
