'use client';

import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';

import { TRANSACTION_CATEGORIES } from '@/lib/constants/enums';
import {
  TRANSACTION_CATEGORIES_CONFIG,
  TRANSACTION_TYPE_CONFIG,
} from '@/lib/constants/transactions';
import { useSearchInput } from '@/hooks/useSearchInput';
import { useSelectValue } from '@/hooks/useSelectValue';
import { useTheme } from '@/hooks/useTheme';

import Input from '../ui/inputs/Input';
import TextArea from '../ui/inputs/TextArea';
import ModalFieldLabel from '../ui/modals/ModalFieldLabel';
import ModalFieldWrapper from '../ui/modals/ModalFieldWrapper';
import ModalFooter from '../ui/modals/ModalFooter';
import ModalHeader from '../ui/modals/ModalHeader';
import RadioCard from '../ui/selects/RadioCard';
import SegmentedControl from '../ui/selects/SegmentedControl';

interface CreateTransactionFormProps {
  handleClose: () => void;
}

export default function CreateTransactionForm({
  handleClose,
}: CreateTransactionFormProps) {
  const { theme } = useTheme();
  const { selectedValue, setSelectedValue } = useSelectValue();
  const { searchQuery, role, onChange, onClear } = useSearchInput();
  const { register, handleSubmit } = useForm();

  return (
    <form className="flex flex-col dark:text-slate-400">
      <ModalHeader
        operationType="create"
        itemType="transaction"
        handleClose={handleClose}
      />

      <section className="flex flex-col gap-2 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <ModalFieldWrapper>
            <ModalFieldLabel label="Type" />
            <SegmentedControl
              options={TRANSACTION_TYPE_CONFIG}
              selectedValue={selectedValue}
              handleSelect={setSelectedValue}
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
              name="name"
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
            icon="search"
            padding="md"
            value={searchQuery}
            onChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            trailingButton={{ role, onClick: onClear }}
          />
          <div
            className={clsx(
              'grid h-24 grid-cols-3 gap-2 overflow-auto',
              'scrollbar mt-2',
              theme === 'dark' ? 'scrollbar-dark' : '',
            )}
          >
            {TRANSACTION_CATEGORIES.map((category) => {
              const item = TRANSACTION_CATEGORIES_CONFIG[category];

              return (
                <RadioCard
                  key={category}
                  option={category}
                  icon={item.icon}
                  text={item.text}
                  styleConfig={item.style}
                  isCurrent={false}
                  withExtraContent={false}
                  selectedValue={selectedValue}
                  handleSelect={setSelectedValue}
                />
              );
            })}
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
          <TextArea placeholder="Add a note for context, receipt number, etc." />
        </ModalFieldWrapper>
      </section>

      <ModalFooter
        operationType="create"
        itemType="transaction"
        isSubmitting={false}
        handleClose={handleClose}
      />
    </form>
  );
}
