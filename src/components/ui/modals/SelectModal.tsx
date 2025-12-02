import clsx from 'clsx';
import Dialog from '@/components/layouts/Dialog';
import Button from '../buttons/Button';
import Select from '../selects/Select';
import { transactionStatus } from '@/lib/constants/ui';

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
  const defaultValue = [...new Set(selectedItems.map((el) => el.status))];

  return (
    <Dialog ref={ref} handleClose={handleClose} heading="Change status">
      <form className={clsx('flex min-w-84 flex-col dark:text-slate-400')}>
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
          <Button onClick={handleClose} size="sm" color="outline">
            Cancel
          </Button>
          <Button color="blue" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
