'use client';

import { TransactionItem } from '@/types/types';

import { deleteTransaction } from '@/lib/actions/transactionActions';

import DeleteForm from '@/components/forms/DeleteForm';
import EditTransactionForm from '@/components/forms/EditTransactionForm';

import ButtonIcon from '../../buttons/ButtonIcon';
import ModalTrigger from '../../modals/ModalTrigger';

interface TransactionActionButtonsProps {
  item: TransactionItem;
}

export default function TransactionActionButtons({
  item,
}: TransactionActionButtonsProps) {
  return (
    <>
      <div className="flex text-slate-500 dark:text-slate-300">
        <ButtonIcon
          iconName="copy"
          shape="square"
          variant="ghost"
          size={14}
          tooltipLabel="Duplicate transaction"
        />
        <ModalTrigger
          modalWidth="lg"
          renderTrigger={(open) => (
            <ButtonIcon
              iconName="edit"
              shape="square"
              variant="ghost"
              size={14}
              onClick={open}
              tooltipLabel="Edit transaction"
            />
          )}
          renderContent={(close) => (
            <EditTransactionForm item={item} onClose={close} />
          )}
        />

        <ModalTrigger
          renderTrigger={(open) => (
            <ButtonIcon
              iconName="delete"
              shape="square"
              variant="ghost"
              size={14}
              onClick={open}
              tooltipLabel="Delete transaction"
            />
          )}
          renderContent={(close) => (
            <DeleteForm
              onClose={close}
              itemType="transaction"
              items={[item]}
              onSubmit={() => deleteTransaction(item.transactionId)}
            />
          )}
        />
      </div>
    </>
  );
}
