import clsx from 'clsx';

interface TransactionModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactNode;
  className?: string;
}

export default function Dialog({
  ref,
  children,
  className,
}: TransactionModalProps) {
  return (
    <dialog
      ref={ref}
      className={clsx(
        'top-1/2 left-1/2 m-0 -translate-1/2 rounded-md p-6',
        'overflow-visible bg-slate-50 dark:bg-slate-900',
        'backdrop:bg-slate-400/60 dark:backdrop:bg-slate-700/60',
        `${className}`,
      )}
    >
      <div className="mb-4 flex items-center justify-between"></div>
      {children}
    </dialog>
  );
}
