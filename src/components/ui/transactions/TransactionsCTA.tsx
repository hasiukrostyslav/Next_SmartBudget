'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
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
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [isOpen]);

  const handleClose = () => {
    modalRef.current?.close();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
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
      {isOpen && <TransactionModal ref={modalRef} handleClose={handleClose} />}
    </>
  );
}
