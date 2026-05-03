import { useTransition } from 'react';
import clsx from 'clsx';
import Dialog from './Dialog';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import { DeleteItem, ItemType } from '@/types/types';
import { calcDeletedBalance } from '@/lib/utils/utils';
import getSymbolFromCurrency from 'currency-symbol-map';

interface DeleteModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  itemType: ItemType;
  items: DeleteItem[];
  handleClose: () => void;
  handleSubmit: () => Promise<{ success: boolean; status: number }>;
}

export default function DeleteModal({
  ref,
  itemType,
  items,
  handleClose,
  handleSubmit,
}: DeleteModalProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.SyntheticEvent) => {
    e.preventDefault();

    startTransition(async () => {
      await handleSubmit();
    });

    handleClose();
  };

  const balance = calcDeletedBalance(items);

  return (
    <Dialog ref={ref} className="max-w-4/12 px-0 py-0">
      <ModalHeader
        itemsCount={items.length}
        itemType={itemType}
        handleClose={handleClose}
      />

      <form onSubmit={handleDelete}>
        <section className="flex flex-col gap-4 px-6 py-5">
          <div className="text-sm dark:text-slate-300">
            You're about to permanently delete{' '}
            <span className="font-semibold">
              {`${items.length === 1 ? items[0].name : items.length} 
            ${itemType}${items.length > 1 ? 's' : ''}`}
            </span>
            . Their amounts will be removed from your account balances and
            category totals.
          </div>
          <div
            className={clsx(
              'flex items-center justify-between rounded-xl border',
              'border-red-500 bg-red-200 px-4 py-4 text-sm font-semibold text-red-700',
              'dark:border-red-300 dark:bg-red-500 dark:text-red-100',
            )}
          >
            <span>Total impact on balance</span>
            <div className="flex gap-2 divide-x divide-slate-400">
              {balance.map((item) => (
                <div
                  key={item.currency}
                  className={clsx(
                    'flex gap-0.5 pr-2',
                    item.total < 0
                      ? 'text-green-600 dark:text-green-400'
                      : item.total === 0
                        ? 'text-amber-500'
                        : '',
                  )}
                >
                  <span>
                    {item.total > 0
                      ? -item.total
                      : item.total < 0
                        ? '+' + Math.abs(item.total)
                        : Math.abs(item.total)}
                  </span>
                  <span>{getSymbolFromCurrency(item.currency)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ModalFooter
          itemsCount={items.length}
          itemType={itemType}
          handleClose={handleClose}
          disabled={isPending}
        />
      </form>
    </Dialog>
  );
}
