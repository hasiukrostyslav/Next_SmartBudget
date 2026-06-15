'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { OperationType, TRANSACTION_CATEGORIES } from '@/lib/constants/enums';
import {
  TRANSACTION_CATEGORIES_CONFIG,
  TRANSACTION_TYPE_CONFIG,
} from '@/lib/constants/transactions';
import { CreateTransactionSchema } from '@/lib/schemas/transaction.schema';
import { useSearchInput } from '@/hooks/useSearchInput';
import { useSelectValue } from '@/hooks/useSelectValue';
import { useTheme } from '@/hooks/useTheme';

import EmptySearchResult from '../ui/feedback/EmptySearchResult';
import Input from '../ui/inputs/Input';
import TextArea from '../ui/inputs/TextArea';
import ModalFieldLabel from '../ui/modals/ModalFieldLabel';
import ModalFieldWrapper from '../ui/modals/ModalFieldWrapper';
import ModalFooter from '../ui/modals/ModalFooter';
import ModalHeader from '../ui/modals/ModalHeader';
import RadioCard from '../ui/selects/RadioCard';
import SegmentedControl from '../ui/selects/SegmentedControl';

type FormData = z.infer<typeof CreateTransactionSchema>;

interface CreateTransactionFormProps {
  onClose: () => void;
}

export default function CreateTransactionForm({
  onClose,
}: CreateTransactionFormProps) {
  const { theme } = useTheme();
  const { selectedValue, setSelectedValue } = useSelectValue();
  const { searchQuery, role, onChange, onClear } = useSearchInput();
  const { register, handleSubmit, control } = useForm();

  const filteredCategories = TRANSACTION_CATEGORIES.filter((el) =>
    searchQuery.length === 0
      ? el
      : el.replaceAll('_', ' ').includes(searchQuery.trimStart()) ||
        TRANSACTION_CATEGORIES_CONFIG[el].text.description
          .toLowerCase()
          .includes(searchQuery.trimStart()),
  ).toSorted();

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
      autoComplete="off"
      className="flex flex-col dark:text-slate-400"
    >
      <ModalHeader
        operationType={OperationType.CREATE}
        itemType="transaction"
        onClose={onClose}
      />

      <section className="flex flex-col gap-2 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <ModalFieldWrapper>
            <ModalFieldLabel label="Type" />
            <Controller
              control={control}
              name="transactionType"
              render={({ field }) => (
                <SegmentedControl
                  options={TRANSACTION_TYPE_CONFIG}
                  selectedValue={field.value}
                  onSelect={field.onChange}
                />
              )}
            />
          </ModalFieldWrapper>

          <ModalFieldWrapper>
            <ModalFieldLabel label="Status" />
            <Input name="amount" padding="md" />
          </ModalFieldWrapper>
        </div>

        <div className="flex items-center justify-between gap-4">
          <ModalFieldWrapper>
            <ModalFieldLabel label="Name" />
            <Input
              {...register('transactionName')}
              padding="md"
              placeholder="e.g. Grocery shopping"
            />
          </ModalFieldWrapper>
          <ModalFieldWrapper>
            <ModalFieldLabel label="Amount & currency" />
            <Input name="amount" padding="md" />
          </ModalFieldWrapper>
        </div>

        <ModalFieldWrapper>
          <ModalFieldLabel label="Category" />
          <Input
            name="search"
            placeholder="Search categories..."
            iconName="search"
            padding="md"
            value={searchQuery}
            onChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            trailingButton={{ role, onClick: onClear }}
          />
          <div
            className={clsx(
              'mt-2 grid h-24 auto-rows-min grid-cols-3 gap-2 pr-2',
              'scrollbar overflow-y-auto',
              theme === 'dark' ? 'scrollbar-dark' : '',
              filteredCategories.length === 0 ? 'place-content-center' : '',
            )}
          >
            {filteredCategories.length === 0 ? (
              <EmptySearchResult
                category="category"
                variant="simple"
                query={searchQuery}
              />
            ) : (
              filteredCategories.map((category) => {
                const item = TRANSACTION_CATEGORIES_CONFIG[category];

                return (
                  <RadioCard
                    key={category}
                    option={category}
                    iconName={item.icon}
                    text={item.text}
                    styleConfig={item.style}
                    isCurrent={false}
                    withExtraContent={false}
                    selectedValue={selectedValue}
                    onSelect={setSelectedValue}
                  />
                );
              })
            )}
          </div>
        </ModalFieldWrapper>

        <div className="flex items-center justify-between gap-4">
          <ModalFieldWrapper>
            <ModalFieldLabel label="Date" />
            <Input name="name" padding="md" />
          </ModalFieldWrapper>
          <ModalFieldWrapper>
            <ModalFieldLabel label="Payment method" />
            <Input name="amount" padding="md" />
          </ModalFieldWrapper>
        </div>

        <ModalFieldWrapper>
          <ModalFieldLabel label="note" isOptional />
          <TextArea
            {...register('description')}
            placeholder="Add a note for context, receipt number, etc."
          />
        </ModalFieldWrapper>
      </section>

      <ModalFooter
        operationType={OperationType.CREATE}
        itemType="transaction"
        isSubmitting={false}
        onClose={onClose}
      />
    </form>
  );
}
