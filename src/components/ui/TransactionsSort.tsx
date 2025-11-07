import clsx from 'clsx';
import CheckBox from './CheckBox';
import SortItem from './SortItem';

export default function TransactionsSort() {
  return (
    <div
      className={clsx(
        'col-span-full mb-4 grid grid-cols-subgrid items-center px-1',
      )}
    >
      <CheckBox name="all" />
      <SortItem label="Transaction Name" />
      <SortItem label="Account" />
      <SortItem label="Date & Time" />
      <SortItem label="Amount" />
      <SortItem label="Note" />
      <SortItem label="Status" />
    </div>
  );
}
