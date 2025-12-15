import { useTransition } from 'react';
import clsx from 'clsx';
import { changeTransactionStatus } from '@/lib/actions/transactionActions';
import { transactionStatus } from '@/lib/constants/ui';
import Dialog from '@/components/layouts/Dialog';
import Button from '../buttons/Button';
import Select from '../selects/Select';
import Icon from '../Icon';

interface SelectModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  selectedItems: {
    id: string;
    status: keyof typeof transactionStatus;
  }[];
}

export default function SelectModal({
  ref,
  handleClose,
  selectedItems,
}: SelectModalProps) {
  const [isPending, startTransition] = useTransition();
  const defaultValue = [...new Set(selectedItems.map((el) => el.status))];

  const handleSubmit = () => {
    startTransition(async () => {
      await changeTransactionStatus(
        selectedItems.map((el) => el.id),
        'COMPLETED',
      );
    });
  };

  return (
    <Dialog ref={ref} handleClose={handleClose} heading="Change status">
      <form
        onSubmit={handleSubmit}
        className={clsx('flex min-w-84 flex-col dark:text-slate-400')}
      >
        <Select
          placeholder="Select status"
          name="status"
          width="full"
          data={Object.values(transactionStatus)}
          defaultOption={
            defaultValue.length === 1 ? defaultValue[0] : undefined
          }
        />
        <div className="mt-10 flex justify-end gap-4 text-base">
          <Button
            type="button"
            onClick={handleClose}
            size="sm"
            color="outline"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" color="blue" size="sm" disabled={isPending}>
            {!isPending ? (
              'Submit'
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Icon size={16} name="loader-circle" className="animate-spin" />
                Submit
              </span>
            )}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
