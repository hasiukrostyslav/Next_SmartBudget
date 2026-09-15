import { useCallback, useEffect, useRef, useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Declared before the effects that use them (the effect used to reference
  // handleClose before its declaration).
  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  // The <dialog> only exists while open, so listeners attach when it opens.
  // This used to have no dependency array and re-subscribe on every render.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.target !== dialog && dialog.contains(event.target as Node))
        return;

      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        handleClose();
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);
    dialog.addEventListener('mousedown', handleMouseDown);
    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
      dialog.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, handleClose]);

  return { dialogRef, isOpen, handleOpen, handleClose };
}
