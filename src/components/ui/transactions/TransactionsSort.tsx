import clsx from 'clsx';
import SortButton from '../buttons/SortButton';
import CheckBox from '../inputs/CheckBox';

export default function TransactionsSort() {
  return (
    <div
      className={clsx(
        'Buttons-center col-span-full mb-4 grid grid-cols-subgrid px-1',
      )}
    >
      <CheckBox name="all" />
      <SortButton label="Transaction Name" />
      <SortButton label="Account" />
      <SortButton label="Date & Time" />
      <SortButton label="Amount" />
      <SortButton label="Note" />
      <SortButton label="Status" />
    </div>
  );
}
