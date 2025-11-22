'use client';

import clsx from 'clsx';
import { useDialog } from '@/hooks/useDialog';
import Button from '../buttons/Button';
import Icon from '../Icon';
import TransactionModal from '../modals/TransactionModal';

interface TransactionsCTAProps {
  buttonSize: 'md' | 'lg';
  iconSize: number;
}

export default function TransactionsCTA({
  buttonSize,
  iconSize,
}: TransactionsCTAProps) {
  const { dialogRef, isOpen, handleOpen, handleClose } = useDialog();

  return (
    <>
      <Button
        onClick={handleOpen}
        className={clsx(
          'flex items-center',
          buttonSize === 'md' ? 'gap-0.5 text-sm' : 'gap-1.5',
        )}
        color="blue"
        size={buttonSize}
      >
        <Icon name="plus" size={iconSize} />
        <span>Create{buttonSize === 'lg' ? ' Transaction' : ''}</span>
      </Button>
      {isOpen && <TransactionModal ref={dialogRef} handleClose={handleClose} />}
    </>
  );
}
