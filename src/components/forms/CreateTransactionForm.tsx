'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  OperationType,
  STATUSES,
  TRANSACTION_CATEGORIES,
} from '@/lib/constants/enums';
import {
  CREATE_TRANSACTION_FIELDS,
  STATUS_CONFIG,
  TRANSACTION_CATEGORIES_CONFIG,
  TRANSACTION_TYPE_CONFIG,
} from '@/lib/constants/transactions';
import { CreateTransactionSchema } from '@/lib/schemas/transaction.schema';
import { useSearchInput } from '@/hooks/useSearchInput';
import { useTheme } from '@/hooks/useTheme';

import RadioCard from '../ui/controls/RadioCard';
import SegmentedControl from '../ui/controls/SegmentedControl';
import EmptySearchResult from '../ui/feedback/EmptySearchResult';
import Input from '../ui/inputs/Input';
import TextArea from '../ui/inputs/TextArea';
import ModalFieldLabel from '../ui/modals/ModalFieldLabel';
import ModalFieldRow from '../ui/modals/ModalFieldRow';
import ModalFieldWrapper from '../ui/modals/ModalFieldWrapper';
import ModalFooter from '../ui/modals/ModalFooter';
import ModalHeader from '../ui/modals/ModalHeader';
import Select from '../ui/selects/Select';

type FormData = z.infer<typeof CreateTransactionSchema>;

interface CreateTransactionFormProps {
  onClose: () => void;
}

export default function CreateTransactionForm({
  onClose,
}: CreateTransactionFormProps) {
  const { theme } = useTheme();
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
        <ModalFieldRow>
          <ModalFieldWrapper>
            <ModalFieldLabel label={CREATE_TRANSACTION_FIELDS.TYPE.label} />
            <Controller
              control={control}
              name={CREATE_TRANSACTION_FIELDS.TYPE.name}
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
            <ModalFieldLabel label={CREATE_TRANSACTION_FIELDS.STATUS.label} />
            <Select
              label={CREATE_TRANSACTION_FIELDS.STATUS.name}
              options={[...STATUSES].map((status) => ({
                value: status,
                label: STATUS_CONFIG[status].text.header,
                icon: STATUS_CONFIG[status].icon,
                color: STATUS_CONFIG[status].style.icon,
              }))}
              padding="md"
              showSelectedOption
              placeholder={CREATE_TRANSACTION_FIELDS.STATUS.placeholder}
            />
          </ModalFieldWrapper>
        </ModalFieldRow>

        <ModalFieldRow>
          <ModalFieldWrapper>
            <ModalFieldLabel label={CREATE_TRANSACTION_FIELDS.NAME.label} />
            <Input
              {...register(CREATE_TRANSACTION_FIELDS.NAME.name)}
              padding="md"
              placeholder={CREATE_TRANSACTION_FIELDS.NAME.placeholder}
            />
          </ModalFieldWrapper>

          <ModalFieldWrapper>
            <ModalFieldLabel label="Amount & currency" />
            <Input name="amount" padding="md" />
          </ModalFieldWrapper>
        </ModalFieldRow>

        <ModalFieldWrapper>
          <ModalFieldLabel label={CREATE_TRANSACTION_FIELDS.CATEGORY.label} />
          <Input
            name="search"
            placeholder={CREATE_TRANSACTION_FIELDS.CATEGORY.placeholder}
            iconName="search"
            padding="md"
            value={searchQuery}
            onChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            trailingButton={{ role, onClick: onClear }}
          />
          <Controller
            control={control}
            name={CREATE_TRANSACTION_FIELDS.CATEGORY.name}
            render={({ field }) => (
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
                        selectedValue={field.value}
                        onSelect={field.onChange}
                      />
                    );
                  })
                )}
              </div>
            )}
          />
        </ModalFieldWrapper>

        <ModalFieldRow>
          <ModalFieldWrapper>
            <ModalFieldLabel label="Date" />
            <Input name="name" padding="md" />
          </ModalFieldWrapper>

          <ModalFieldWrapper>
            <ModalFieldLabel label="Payment method" />
            <Input name="amount" padding="md" />
          </ModalFieldWrapper>
        </ModalFieldRow>

        <ModalFieldWrapper>
          <ModalFieldLabel
            label={CREATE_TRANSACTION_FIELDS.DESCRIPTION.label}
            isOptional
          />
          <TextArea
            {...register(CREATE_TRANSACTION_FIELDS.DESCRIPTION.name)}
            placeholder={CREATE_TRANSACTION_FIELDS.DESCRIPTION.placeholder}
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
