'use client';

import { useTransition } from 'react';

import clsx from 'clsx';

import { changeTransactionCategory } from '@/lib/actions/transactionActions';
import {
  TRANSACTION_CATEGORIES,
  TransactionCategories,
} from '@/lib/constants/enums';
import { TRANSACTION_CATEGORIES_CONFIG } from '@/lib/constants/ui';
import { useSearchInput } from '@/hooks/useSearchInput';
import { useSelectValue } from '@/hooks/useSelectValue';
import { useTheme } from '@/hooks/useTheme';

import EmptyState from '../EmptyState';
import Input from '../inputs/Input';
import RadioCard from '../selects/RadioCard';
import Dialog from './Dialog';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

interface EditCategoryModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
  selectedItems: {
    id: string;
    category: TransactionCategories;
  }[];
}

export default function EditCategoryModal({
  ref,
  handleClose,
  selectedItems,
}: EditCategoryModalProps) {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const { selectedValue, setSelectedValue } = useSelectValue();
  const { searchQuery, role, onChange, onClear } = useSearchInput();

  const initialValue = [...new Set(selectedItems.map((el) => el.category))];
  const filteredCategories = TRANSACTION_CATEGORIES.filter((el) =>
    searchQuery.length === 0
      ? el
      : el.replaceAll('_', ' ').includes(searchQuery.trimStart()) ||
        TRANSACTION_CATEGORIES_CONFIG[el].text.description
          .toLowerCase()
          .includes(searchQuery.trimStart()),
  ).toSorted();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await changeTransactionCategory(
        selectedItems.map((el) => el.id),
        selectedValue as TransactionCategories,
      );

      if (result.success) handleClose();
    });
  };

  return (
    <Dialog ref={ref} className="max-w-5/12 px-0 py-0">
      <form
        onSubmit={handleSubmit}
        className={clsx('flex min-w-84 flex-col dark:text-slate-400')}
      >
        <ModalHeader
          operationType="editCategory"
          itemType="transaction"
          handleClose={handleClose}
        />

        <section className="px-6 py-5">
          <p className="mb-4">
            Update the {selectedItems.length} transaction's category to reflect
            its current state. Changes will appear in the transaction history
            and related records.
          </p>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs">
              NEW CATEGORY <span className="text-red-500">*</span>
            </h4>
            <Input
              name="search"
              placeholder="Search categories..."
              icon="search"
              padding="md"
              value={searchQuery}
              onChange={onChange}
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              trailingButton={{ role, onClick: onClear }}
            />

            <div
              className={clsx(
                'grid h-72 grid-cols-2 gap-3 pr-2',
                'scrollbar auto-rows-min overflow-y-scroll',
                theme === 'dark' ? 'scrollbar-dark' : '',
              )}
            >
              {filteredCategories.length === 0 ? (
                <EmptyState />
              ) : (
                filteredCategories.map((category) => {
                  const item = TRANSACTION_CATEGORIES_CONFIG[category];

                  return (
                    <RadioCard
                      key={category}
                      option={category}
                      selectedValue={selectedValue}
                      handleSelect={setSelectedValue}
                      icon={item.icon}
                      text={item.text}
                      styleConfig={item.style}
                      isCurrent={
                        initialValue.length === 1 &&
                        initialValue[0] === category
                      }
                    />
                  );
                })
              )}
            </div>
          </div>
        </section>

        <ModalFooter
          operationType="edit"
          itemType="transaction"
          disabled={
            isPending ||
            !selectedValue ||
            (initialValue.length === 1 && initialValue[0] === selectedValue)
          }
          isSubmitting={isPending}
          handleClose={handleClose}
        />
      </form>
    </Dialog>
  );
}
