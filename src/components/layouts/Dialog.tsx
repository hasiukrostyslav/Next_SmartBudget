import clsx from 'clsx';
import ButtonIcon from '../ui/buttons/ButtonIcon';

interface TransactionModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  children: React.ReactNode;
  heading: string;
}

export default function Dialog({
  ref,
  handleClose,
  children,
  heading,
}: TransactionModalProps) {
  return (
    <dialog
      ref={ref}
      className={clsx(
        'top-1/2 left-1/2 m-0 -translate-1/2 rounded-md p-4',
        'bg-slate-50 dark:bg-slate-900',
        'backdrop:bg-slate-400/60 dark:backdrop:bg-slate-700/60',
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-wide dark:text-slate-200">
          {heading}
        </h2>
        <ButtonIcon
          className="dark:text-slate-200"
          onClick={handleClose}
          iconName="close"
          shape="square"
          variant="outline"
          size={18}
        />
      </div>
      {children}
    </dialog>
  );
}
