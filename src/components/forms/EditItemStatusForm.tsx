'use client';

import { useTransition } from 'react';

import clsx from 'clsx';

import { changeTransactionStatus } from '@/lib/actions/transactionActions';
import { OperationType, Status, STATUSES } from '@/lib/constants/enums';
import { STATUS_CONFIG } from '@/lib/constants/transactions';
import { useSelectValue } from '@/hooks/useSelectValue';
import { useToast } from '@/hooks/useToast';

import ModalFieldLabel from '../ui/modals/ModalFieldLabel';
import ModalFieldWrapper from '../ui/modals/ModalFieldWrapper';
import ModalFooter from '../ui/modals/ModalFooter';
import ModalHeader from '../ui/modals/ModalHeader';
import RadioCard from '../ui/selects/RadioCard';

interface EditItemStatusFormProps {
  onClose: () => void;
  selectedItems: {
    id: string;
    status: Status;
  }[];
}

export default function EditItemStatusForm({
  onClose,
  selectedItems,
}: EditItemStatusFormProps) {
  const [isPending, startTransition] = useTransition();
  const { selectedValue, setSelectedValue } = useSelectValue();
  const { toastSuccess } = useToast();
  const initialValue = [...new Set(selectedItems.map((el) => el.status))];

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await changeTransactionStatus(
        selectedItems.map((el) => el.id),
        selectedValue as Status,
      );

      if (result.success) {
        onClose();
        toastSuccess(OperationType.EDIT, 'Transaction');
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx('flex min-w-84 flex-col dark:text-slate-400')}
    >
      <ModalHeader
        operationType="editStatus"
        itemType="transaction"
        onClose={onClose}
      />

      <section className="px-6 py-5">
        <p className="mb-4">
          Update the {selectedItems.length} transaction's status to reflect its
          current state. Changes will appear in the transaction history and
          related records.
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
                  onSelect={setSelectedValue}
                  withExtraContent
                  iconName={item.icon}
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
        operationType={OperationType.EDIT}
        itemType="transaction"
        disabled={
          isPending ||
          !selectedValue ||
          (initialValue.length === 1 && initialValue[0] === selectedValue)
        }
        isSubmitting={isPending}
        onClose={onClose}
      />
    </form>
  );
}
