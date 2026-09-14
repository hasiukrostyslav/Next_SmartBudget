import React from 'react';

import clsx from 'clsx';

import { useModal } from '@/hooks/useModal';

import Modal from './Modal';

interface ModalTriggerProps {
  modalWidth?: 'md' | 'lg';
  renderTrigger: (open: () => void) => React.ReactNode;
  renderContent: (close: () => void) => React.ReactNode;
}

export default function ModalTrigger({
  modalWidth = 'md',
  renderTrigger,
  renderContent,
}: ModalTriggerProps) {
  const { isOpen, dialogRef, handleOpen, handleClose } = useModal();

  return (
    <>
      {renderTrigger(handleOpen)}
      {isOpen && (
        <Modal
          ref={dialogRef}
          // A fixed maximum instead of a share of the viewport: 4/12 of a
          // laptop screen was too narrow for the form, and of a phone unusable.
          className={clsx(
            'w-[calc(100%-2rem)]',
            modalWidth === 'md' ? 'max-w-lg' : 'max-w-2xl',
          )}
        >
          {renderContent(handleClose)}
        </Modal>
      )}
    </>
  );
}
