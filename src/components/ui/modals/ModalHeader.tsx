import clsx from 'clsx';
import ButtonIcon from '../buttons/ButtonIcon';
import Icon from '../Icon';
import { ItemType } from '@/types/types';

interface ModalHeaderProps {
  itemType: ItemType;
  itemsCount: number;
  handleClose: () => void;
}

export default function ModalHeader({
  itemsCount,
  itemType,
  handleClose,
}: ModalHeaderProps) {
  return (
    <header
      className={clsx(
        'flex items-center gap-3',
        'border-b border-slate-300 p-6 pt-3 pb-5 dark:border-slate-600',
      )}
    >
      <div className="rounded-md bg-red-200 p-2 dark:bg-red-500">
        <Icon
          name="delete"
          size={22}
          className="text-red-600 dark:text-red-200"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold dark:text-slate-300">
          Delete {itemsCount} {`${itemType}${itemsCount > 1 ? 's' : ''}`}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          This action cannot be undone
        </p>
      </div>
      <ButtonIcon
        iconName="close"
        size={18}
        shape="square"
        variant="outline"
        className={clsx(
          'ml-auto text-slate-500 hover:bg-slate-200',
          'dark:text-slate-400 dark:hover:bg-slate-700',
        )}
        onClick={handleClose}
      />
    </header>
  );
}
