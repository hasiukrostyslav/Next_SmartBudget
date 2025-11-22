import clsx from 'clsx';
import ToolbarButton from './buttons/ToolbarButton';
import ButtonIcon from './buttons/ButtonIcon';

interface BulkToolbarProps {
  isShown: boolean;
  selectedNumber: number;
  allSelected: boolean;
  bulkSelect: () => void;
  bulkUnSelect: () => void;
}

export default function BulkToolbar({
  isShown,
  selectedNumber,
  allSelected,
  bulkSelect,
  bulkUnSelect,
}: BulkToolbarProps) {
  return (
    <div
      className={clsx(
        'flex items-center px-3 py-2.5 text-sm text-slate-600 dark:bg-slate-950',
        'rounded-md border border-slate-300 shadow-md dark:border-slate-700 dark:shadow-slate-950',
        'absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5',
        !isShown ? 'hidden' : '',
      )}
    >
      <div className="mr-2 flex gap-1 dark:text-slate-400">
        <span
          className={clsx(
            'grid h-5 min-w-5 place-content-center rounded-md px-2',
            'bg-slate-200 dark:bg-slate-800',
          )}
        >
          {selectedNumber}
        </span>
        <span>selected</span>
      </div>
      <ToolbarButton
        iconName="select"
        iconSize={16}
        label="Select all"
        onClick={bulkSelect}
        disabled={allSelected}
      />
      <ToolbarButton
        iconName="status"
        iconSize={16}
        label="Change status"
        onClick={() => console.log('test')}
      />
      <ToolbarButton
        iconName="delete"
        iconSize={16}
        label="Delete"
        onClick={() => console.log('test')}
      />

      <ButtonIcon
        iconName="close"
        size={16}
        shape="square"
        variant="outline"
        padding="base"
        onClick={bulkUnSelect}
        className="hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
      />
    </div>
  );
}
