import Dialog from '@/components/layouts/Dialog';
import Button from '../buttons/Button';
import Icon from '../Icon';

interface DeleteOneModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  itemName: string;
  type: string;
  children: React.ReactNode;
}

export default function DeleteOneModal({
  ref,
  handleClose,
  itemName,
  type,
  children,
}: DeleteOneModalProps) {
  return (
    <Dialog ref={ref} handleClose={handleClose}>
      <div className="flex max-w-84 flex-col items-center justify-center text-center dark:text-slate-400">
        <span className="mb-3 rounded-full bg-red-200 p-2 dark:bg-red-400">
          <Icon
            size={24}
            name="error"
            className="text-red-700 dark:text-red-900"
          />
        </span>

        <h2 className="mb-2 text-xl">Delete {type}</h2>
        <p className="text-sm">
          You&apos;re going to delete the
          {`" ${itemName}" ${type}`}. Are you sure?
        </p>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4 text-base">
        <Button type="button" color="outline" size="sm" onClick={handleClose}>
          No, Keep it
        </Button>
        {children}
      </div>
    </Dialog>
  );
}
