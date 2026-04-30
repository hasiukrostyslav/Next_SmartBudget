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
        'flex items-center rounded-md px-3 py-2.5 text-sm',
        'bg-blue-600 text-slate-100',
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
          iconSize={16}
          label="Select all"
          onClick={bulkSelect}
          disabled={allSelected}
        />
        <ToolbarButton
          iconName="arrow-right-left"
          iconSize={16}
          label="Change status"
          onClick={handleOpen}
        />
        <ToolbarButton
          iconName="arrow-right-left"
          iconSize={16}
          label="Change category"
          onClick={handleOpen}
        />
        <ToolbarButton
          iconName="delete"
          iconSize={16}
          label="Delete"
          onClick={openDeleteModal}
        />
      </div>
      <ButtonIcon
        iconName="close"
        size={16}
        shape="square"
        variant="outline"
        padding="base"
        onClick={bulkUnSelect}
        className="bg-blue-500 hover:bg-blue-600"
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
