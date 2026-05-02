import clsx from 'clsx';
import Icon from '../Icon';
import Button from '../buttons/Button';
import { ItemType } from '@/types/types';

interface ModalFooterProps {
  itemType: ItemType;
  itemsCount: number;
  disabled?: boolean;
  handleClose: () => void;
}

export default function ModalFooter({
  itemsCount,
  itemType,
  handleClose,
  disabled,
}: ModalFooterProps) {
  return (
    <footer
      className={clsx(
        'flex items-center justify-between gap-8 rounded-b-md px-6 py-5 text-base',
        'border-t border-slate-300 bg-slate-100',
        'dark:border-slate-600 dark:bg-slate-900',
      )}
    >
      <div className="flex gap-1 text-red-600">
        <Icon name="error" size={12} />
        <span className="text-xs">Cannot be undone</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button type="button" color="outline" size="md" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          color="red"
          size="md"
          className="flex items-center gap-1"
          disabled={disabled}
        >
          <Icon name="delete" size={16} />
          Delete {itemsCount} {`${itemType}${itemsCount > 1 ? 's' : ''}`}
        </Button>
      </div>
    </footer>
  );
}
