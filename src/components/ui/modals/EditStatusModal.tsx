'use client';

import { useTransition } from 'react';

import clsx from 'clsx';

import { changeTransactionStatus } from '@/lib/actions/transactionActions';
import { Status, STATUSES } from '@/lib/constants/enums';
import { STATUS_CONFIG } from '@/lib/constants/ui';
import { useSelectValue } from '@/hooks/useSelectValue';
import { useToast } from '@/hooks/useToast';

import RadioCard from '../selects/RadioCard';
import Dialog from './Dialog';
import ModalFieldLabel from './ModalFieldLabel';
import ModalFieldWrapper from './ModalFieldWrapper';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

interface EditStatusModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  selectedItems: {
    id: string;
    status: Status;
  }[];
}

export default function EditStatusModal({
  ref,
  handleClose,
  selectedItems,
}: EditStatusModalProps) {
  const [isPending, startTransition] = useTransition();
  const { selectedValue, setSelectedValue } = useSelectValue();
  const { toastSuccess } = useToast();
  const initialValue = [...new Set(selectedItems.map((el) => el.status))];

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await changeTransactionStatus(
        selectedItems.map((el) => el.id),
        selectedValue as Status,
      );

      if (result.success) {
        handleClose();
        toastSuccess('edit', 'Transaction');
      }
    });
  };

  return (
    <Dialog ref={ref} className="max-w-4/12">
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

          <ModalFieldWrapper>
            <ModalFieldLabel label="New status" />
            <div className="flex flex-col gap-3">
              {STATUSES.map((status) => {
                const item = STATUS_CONFIG[status];

                return (
                  <RadioCard
                    key={status}
                    option={status}
                    selectedValue={selectedValue}
                    handleSelect={setSelectedValue}
                    withExtraContent
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
          </ModalFieldWrapper>
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
