import Icon from '../../icons/Icon';

// The column is free text shared with the Express server, so a row can hold a
// value other than Card or Cash; anything that isn't Cash shows a card icon.
// It used to show a Mastercard logo, which claimed a brand nobody entered.
export default function TransactionAccount({
  paymentMethod,
}: {
  paymentMethod: string;
}) {
  return (
    <div className="flex items-center gap-2 px-1.5">
      <Icon name={paymentMethod === 'Cash' ? 'banknote' : 'card'} />
      <span>{paymentMethod}</span>
    </div>
  );
}
