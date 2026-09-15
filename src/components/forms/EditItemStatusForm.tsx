'use client';

import { useTransition } from 'react';

import clsx from 'clsx';

import type { ItemType } from '@/types/types';

import { changeTransactionStatus } from '@/lib/actions/transactionActions';
import { OperationType, Status, STATUSES } from '@/lib/constants/enums';
import { STATUS_CONFIG } from '@/lib/constants/transactions';
import { callAction } from '@/lib/utils/callAction';
import { useSelectValue } from '@/hooks/useSelectValue';
import { useToast } from '@/hooks/useToast';

import RadioCard from '../ui/controls/RadioCard';
import ModalFieldLabel from '../ui/modals/ModalFieldLabel';
import ModalFieldWrapper from '../ui/modals/ModalFieldWrapper';
import ModalFooter from '../ui/modals/ModalFooter';
import ModalHeader from '../ui/modals/ModalHeader';

interface EditItemStatusFormProps {
  itemType: ItemType;
  onClose: () => void;
  selectedItems: {
    id: string;
    status: Status;
  }[];
}

export default function EditItemStatusForm({
  itemType,
  onClose,
  selectedItems,
}: EditItemStatusFormProps) {
  const [isPending, startTransition] = useTransition();
  const { selectedValue, handleSelect } = useSelectValue({});
  const { toastSuccess, toastError } = useToast();
  // Toasts name what was acted on, e.g. "Payment deleted".
  const entity = itemType.charAt(0).toUpperCase() + itemType.slice(1);
  const initialValue = [...new Set(selectedItems.map((el) => el.status))];

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await callAction(() =>
        changeTransactionStatus(
          selectedItems.map((el) => el.id),
          selectedValue as Status,
        ),
      );

      if (result.success) {
        onClose();
        toastSuccess(OperationType.EDIT, entity);
      } else {
        toastError(OperationType.EDIT, entity, result.error);
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
        itemType={itemType}
        onClose={onClose}
      />

      <section className="px-6 py-5">
        <p className="mb-4">
          Update the {selectedItems.length} transaction&apos;s status to reflect
          its current state. Changes will appear in the transaction history and
          related records.
        </p>

        <ModalFieldWrapper>
          <ModalFieldLabel label="New status" />
          <div
            role="radiogroup"
            aria-label="New status"
            className="flex flex-col gap-3"
          >
            {STATUSES.map((status) => {
              const item = STATUS_CONFIG[status];

              return (
                <RadioCard
                  key={status}
                  option={status}
                  selectedValue={selectedValue}
                  onSelect={handleSelect}
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
        itemType={itemType}
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
