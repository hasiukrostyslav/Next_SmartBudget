'use client';

import clsx from 'clsx';

import { deleteManyTransaction } from '@/lib/actions/transactionActions';
import {
  Currency,
  Status,
  TransactionCategories,
  TransactionType,
} from '@/lib/constants/enums';
import { useModal } from '@/hooks/useModal';

import DeleteForm from '@/components/forms/DeleteForm';

import EditItemStatusForm from '../../../forms/EditItemStatusForm';
import EditTransactionCategoryForm from '../../../forms/EditTransactionCategoryForm';
import ButtonIcon from '../../buttons/ButtonIcon';
import ToolbarButton from '../../buttons/ToolbarButton';
import Modal from '../../modals/Modal';

interface BulkToolbarProps {
  isShown: boolean;
  selectedNumber: number;
  allSelected: boolean;
  onBulkSelect: () => void;
  onBulkUnSelect: () => void;
  selectedItems: {
    itemId: string;
    itemName: string;
    status: Status;
    category: TransactionCategories;
    type: TransactionType;
    amount: number;
    currency: Currency;
  }[];
}

export default function BulkToolbar({
  isShown,
  selectedNumber,
  allSelected,
  onBulkSelect,
  onBulkUnSelect,
  selectedItems,
}: BulkToolbarProps) {
  const {
    isOpen: isOpenEditStatusModal,
    dialogRef: editStatusModalRef,
    handleOpen: openEditStatusModal,
    handleClose: closeEditStatusModal,
  } = useModal();

  const {
    isOpen: isOpenEditCategoryModal,
    dialogRef: editCategoryModalRef,
    handleOpen: openEditCategoryModal,
    handleClose: closeEditCategoryModal,
  } = useModal();

  const {
    isOpen: isOpenDeleteModal,
    dialogRef: deleteModalRef,
    handleOpen: openDeleteModal,
    handleClose: closeDeleteModal,
  } = useModal();

  return (
    <div
      className={clsx(
        'flex items-center rounded-md px-3 py-2.5 text-sm',
        'bg-blue-600 text-slate-100 dark:bg-blue-800/20',
        'absolute top-full left-1/5 translate-y-3',
        !isShown ? 'hidden' : '',
      )}
    >
      <div className="mr-3 flex gap-1 border-r pr-3">
        <span
          className={clsx(
            'grid h-5 min-w-5 place-content-center rounded-md px-2',
            'bg-blue-500',
          )}
        >
          {selectedNumber}
        </span>
        <span>selected</span>
      </div>
      <div className="mr-9 flex items-center justify-center gap-3">
        <ToolbarButton
          iconName="select"
          iconSize={14}
          label="Select all"
          onClick={onBulkSelect}
          disabled={allSelected}
        />
        <ToolbarButton
          iconName="refresh"
          iconSize={14}
          label="Change status"
          onClick={openEditStatusModal}
        />
        <ToolbarButton
          iconName="tag"
          iconSize={14}
          label="Change category"
          onClick={openEditCategoryModal}
        />
        <ToolbarButton
          iconName="delete"
          iconSize={14}
          label="Delete"
          onClick={openDeleteModal}
        />
      </div>
      <ButtonIcon
        iconName="close"
        size={14}
        shape="square"
        variant="outline"
        padding="base"
        onClick={onBulkUnSelect}
        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800/10"
      />

      {isOpenEditStatusModal && (
        <Modal ref={editStatusModalRef} className="max-w-4/12">
          <EditItemStatusForm
            onClose={closeEditStatusModal}
            selectedItems={selectedItems.map((el) => ({
              id: el.itemId,
              status: el.status,
            }))}
          />
        </Modal>
      )}

      {isOpenEditCategoryModal && (
        <Modal ref={editCategoryModalRef} className="max-w-5/12">
          <EditTransactionCategoryForm
            onClose={closeEditCategoryModal}
            selectedItems={selectedItems.map((el) => ({
              id: el.itemId,
              category: el.category,
            }))}
          />
        </Modal>
      )}

      {isOpenDeleteModal && (
        <Modal ref={deleteModalRef} className="max-w-4/12">
          <DeleteForm
            itemType="transaction"
            items={selectedItems.map((el) => ({
              id: el.itemId,
              name: el.itemName,
              type: el.type,
              currency: el.currency,
              amount: el.amount,
            }))}
            onClose={closeDeleteModal}
            onSubmit={() =>
              deleteManyTransaction(selectedItems.map((el) => el.itemId))
            }
          />
        </Modal>
      )}
    </div>
  );
}
