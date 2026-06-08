'use client';

import { DeleteItem } from '@/types/types';

import { deleteTransaction } from '@/lib/actions/transactionActions';
import { useModal } from '@/hooks/useModal';

import DeleteForm from '@/components/forms/DeleteForm';

import ButtonIcon from '../../buttons/ButtonIcon';
import Modal from '../../modals/Modal';

interface TransactionActionButtonsProps {
  item: DeleteItem;
}

export default function TransactionActionButtons({
  item,
}: TransactionActionButtonsProps) {
  const { isOpen, dialogRef, handleOpen, handleClose } = useModal();

  return (
    <>
      <div className="flex text-slate-500">
        <ButtonIcon
          iconName="copy"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
          tooltipLabel="Duplicate transaction"
        />
        <ButtonIcon
          iconName="edit"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
          tooltipLabel="Edit transaction"
        />
        <ButtonIcon
          iconName="delete"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
          onClick={handleOpen}
          tooltipLabel="Delete transaction"
        />
      </div>
      {isOpen && (
        <Modal ref={dialogRef} className="max-w-4/12">
          <DeleteForm
            onClose={handleClose}
            itemType="transaction"
            items={[item]}
            onSubmit={() => deleteTransaction(item.id)}
          />
        </Modal>
      )}
    </>
  );
}
