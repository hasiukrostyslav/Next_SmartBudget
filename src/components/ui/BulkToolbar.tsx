import clsx from 'clsx';
import Button from './buttons/Button';
import ButtonIcon from './buttons/ButtonIcon';
import Icon from './Icon';

export default function BulkToolbar() {
  return (
    <div
      className={clsx(
        'flex items-center gap-5 px-3 py-2.5 text-sm text-slate-600',
        'rounded-md border border-slate-300 shadow-md dark:border-blue-400',
        'absolute top-full translate-x-7/12 translate-y-3.5',
      )}
    >
      <div className="flex gap-1 dark:text-slate-400">
        <span
          className={clsx(
            'grid h-5 min-w-5 place-content-center rounded-md px-2',
            'bg-slate-200 dark:bg-slate-800',
          )}
        >
          2
        </span>
        <span>selected</span>
      </div>
      <Button size="xs" color="transparent">
        <Icon name="select" size={16} />
        <span>Select all</span>
      </Button>
      <Button size="xs" color="transparent">
        <Icon name="status" size={16} />
        <span>Change status</span>
      </Button>
      <Button size="xs" color="transparent">
        <Icon name="delete" size={16} />
        <span>Delete</span>
      </Button>
      <ButtonIcon
        iconName="close"
        size={16}
        shape="square"
        variant="outline"
        padding="sm"
        className="dark:text-slate-400"
      />
    </div>
  );
}
