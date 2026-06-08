import clsx from 'clsx';

interface DialogProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ ref, children, className }: DialogProps) {
  return (
    <dialog
      ref={ref}
      className={clsx(
        'outline-input top-1/2 left-1/2 -translate-1/2 rounded-xl',
        'overflow-visible bg-slate-50 dark:bg-slate-900',
        'backdrop:bg-slate-400/60 dark:backdrop:bg-slate-700/60',
        `${className}`,
      )}
    >
      {children}
    </dialog>
  );
}
