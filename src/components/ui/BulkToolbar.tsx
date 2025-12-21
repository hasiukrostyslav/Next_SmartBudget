'use client';

import clsx from 'clsx';
import { useDialog } from '@/hooks/useDialog';
import ToolbarButton from './buttons/ToolbarButton';
import ButtonIcon from './buttons/ButtonIcon';
import DeleteManyModal from './modals/DeleteManyModal.tsx';
import DeleteManyTransactionForm from '../forms/DeleteManyTransactionForm';
import SelectModal from './modals/SelectModal';
import { transactionStatus } from '@/lib/constants/ui';

interface BulkToolbarProps {
  isShown: boolean;
  selectedNumber: number;
  allSelected: boolean;
  bulkSelect: () => void;
  bulkUnSelect: () => void;
  selectedItems: {
    itemId: string;
    itemName: string;
    status: keyof typeof transactionStatus;
  }[];
}

export default function BulkToolbar({
  isShown,
  selectedNumber,
  allSelected,
  bulkSelect,
  bulkUnSelect,
  selectedItems,
}: BulkToolbarProps) {
  const { isOpen, dialogRef, handleOpen, handleClose } = useDialog();
  const {
    isOpen: isOpenDeleteModal,
    dialogRef: deleteModalRef,
    handleOpen: openDeleteModal,
    handleClose: closeDeleteModal,
  } = useDialog();

  return (
    <div
      className={clsx(
        'flex items-center px-3 py-2.5 text-sm text-slate-600 dark:bg-slate-950',
        'rounded-md border border-slate-300 shadow-md dark:border-slate-700 dark:shadow-slate-950',
        'absolute top-full left-1/2 -translate-x-1/2 translate-y-2.5',
        !isShown ? 'hidden' : '',
      )}
    >
      <div className="mr-2 flex gap-1 dark:text-slate-400">
        <span
          className={clsx(
            'grid h-5 min-w-5 place-content-center rounded-md px-2',
            'bg-slate-200 dark:bg-slate-800',
          )}
        >
          {selectedNumber}
        </span>
        <span>selected</span>
      </div>
      <ToolbarButton
        iconName="select"
        iconSize={16}
        label="Select all"
        onClick={bulkSelect}
        disabled={allSelected}
      />
      <ToolbarButton
        iconName="status"
        iconSize={16}
        label="Change status"
        onClick={handleOpen}
      />
      <ToolbarButton
        iconName="delete"
        iconSize={16}
        label="Delete"
        onClick={openDeleteModal}
      />

      <ButtonIcon
        iconName="close"
        size={16}
        shape="square"
        variant="outline"
        padding="base"
        onClick={bulkUnSelect}
        className="hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
      />

      {isOpen && (
        <SelectModal
          ref={dialogRef}
          handleClose={handleClose}
          selectedItems={selectedItems.map((el) => ({
            id: el.itemId,
            status: el.status,
          }))}
        />
      )}

      {isOpenDeleteModal && (
        <DeleteManyModal
          ref={deleteModalRef}
          handleClose={closeDeleteModal}
          selectedItems={selectedItems.map((el) => el.itemName)}
          type="transaction"
        >
          <DeleteManyTransactionForm
            selectedItems={selectedItems.map((el) => el.itemId)}
            handleClose={closeDeleteModal}
          />
        </DeleteManyModal>
      )}
    </div>
  );
}
