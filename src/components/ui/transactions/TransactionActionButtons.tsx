'use client';

import { useDialog } from '@/hooks/useDialog';
import ButtonIcon from '../buttons/ButtonIcon';
import DeleteOneModal from '../modals/DeleteOneModal';
import DeleteTransactionForm from '@/components/forms/DeleteTransactionForm';

interface TransactionActionButtonsProps {
  item: { id: string; name: string };
}

export default function TransactionActionButtons({
  item,
}: TransactionActionButtonsProps) {
  const { isOpen, dialogRef, handleOpen, handleClose } = useDialog();

  return (
    <>
      <div className="flex text-slate-500">
        <ButtonIcon
          iconName="copy"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
        />
        <ButtonIcon
          iconName="edit"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
        />
        <ButtonIcon
          iconName="delete"
          shape="square"
          variant="outline"
          size={14}
          className="hover:text-slate-400"
          onClick={handleOpen}
        />
      </div>
      {isOpen && (
        <DeleteOneModal
          ref={dialogRef}
          handleClose={handleClose}
          itemName={item.name}
          type="transaction"
        >
          <DeleteTransactionForm id={item.id} handleClose={handleClose} />
        </DeleteOneModal>
      )}
    </>
  );
}
