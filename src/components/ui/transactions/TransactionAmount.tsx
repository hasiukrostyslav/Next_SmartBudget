import clsx from 'clsx';
import getSymbolFromCurrency from 'currency-symbol-map';
import { getFormattedAmount } from '@/lib/utils/utils';
import { Currency, TransactionType } from '@/lib/constants/enums';

interface TransactionAmountProps {
  type: TransactionType;
  amount: number;
  currency: Currency;
}

export default function TransactionAmount({
  type,
  amount,
  currency,
}: TransactionAmountProps) {
  const formattedAmount = getFormattedAmount(amount);

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
