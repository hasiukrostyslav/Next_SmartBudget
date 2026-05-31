'use client';

import { DeleteItem } from '@/types/types';

import { deleteTransaction } from '@/lib/actions/transactionActions';
import { useDialog } from '@/hooks/useDialog';

import ButtonIcon from '../../buttons/ButtonIcon';
import DeleteModal from '../../modals/DeleteModal';

interface TransactionActionButtonsProps {
  item: DeleteItem;
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
        <DeleteModal
          ref={dialogRef}
          handleClose={handleClose}
          itemType="transaction"
          items={[item]}
          handleSubmit={() => deleteTransaction(item.id)}
        />
      )}
    </>
  );
}
