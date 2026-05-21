import { useTransition } from 'react';
import clsx from 'clsx';
import { changeTransactionStatus } from '@/lib/actions/transactionActions';
import { useSelectValue } from '@/hooks/useSelectValue';
import Dialog from './Dialog';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import RadioCard from '../selects/RadioCard';
import { STATUS_CONFIG } from '@/lib/constants/ui';

interface EditStatusModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  selectedItems: {
    id: string;
    status: keyof typeof STATUS_CONFIG;
  }[];
}

export default function EditStatusModal({
  ref,
  handleClose,
  selectedItems,
}: EditStatusModalProps) {
  const [isPending, startTransition] = useTransition();
  const { selectedValue, setSelectedValue } = useSelectValue();
  const initialValue = [...new Set(selectedItems.map((el) => el.status))];
  const STATUS = Object.keys(STATUS_CONFIG) as Array<
    keyof typeof STATUS_CONFIG
  >;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await changeTransactionStatus(
        selectedItems.map((el) => el.id),
        selectedValue as keyof typeof STATUS_CONFIG,
      );

      if (result.success) handleClose();
    });
  };

  return (
    <Dialog ref={ref} className="max-w-4/12 px-0 py-0">
      <form
        onSubmit={handleSubmit}
        className={clsx('flex min-w-84 flex-col dark:text-slate-400')}
      >
        <ModalHeader
          operationType="editStatus"
          itemType="transaction"
          handleClose={handleClose}
        />

        <section className="px-6 py-5">
          <p className="mb-4">
            Update the {selectedItems.length} transaction's status to reflect
            its current state. Changes will appear in the transaction history
            and related records.
          </p>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs">
              NEW STATUS <span className="text-red-500">*</span>
            </h4>
            <div className="flex flex-col gap-3">
              {STATUS.map((status) => {
                const item = STATUS_CONFIG[status];

                return (
                  <RadioCard
                    key={status}
                    option={status}
                    selectedValue={selectedValue}
                    handleSelect={setSelectedValue}
                    icon={item.icon}
                    text={item.text}
                    styleConfig={item.style}
                    isCurrent={
                      initialValue.length === 1 && initialValue[0] === status
                    }
                  />
                );
              })}
            </div>
          </div>
        </section>

        <ModalFooter
          operationType="edit"
          itemType="transaction"
          disabled={
            isPending ||
            !selectedValue ||
            (initialValue.length === 1 && initialValue[0] === selectedValue)
          }
          isSubmitting={isPending}
          handleClose={handleClose}
        />
      </form>
    </Dialog>
  );
}
