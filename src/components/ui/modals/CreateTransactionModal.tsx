'use client';

import { useSearchInput } from '@/hooks/useSearchInput';
import { useSelectValue } from '@/hooks/useSelectValue';

import Input from '../inputs/Input';
import TextArea from '../inputs/TextArea';
import SegmentedControl from '../selects/SegmentedControl';
import Dialog from './Dialog';
import ModalFieldLabel from './ModalFieldLabel';
import ModalFieldWrapper from './ModalFieldWrapper';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

interface CreateTransactionModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
}

const TYPE_CONFIG = [
  { option: 'Income', icon: 'arrow-up', color: 'text-green-500' },
  { option: 'Expenses', icon: 'arrow-down', color: 'text-red-500' },
];

export default function CreateTransactionModal({
  ref,
  handleClose,
}: CreateTransactionModalProps) {
  const { selectedValue, setSelectedValue } = useSelectValue();
  const { searchQuery, role, onChange, onClear } = useSearchInput();

  return (
    <Dialog ref={ref} className="max-w-5/12">
      <form className="flex flex-col dark:text-slate-400">
        <ModalHeader
          operationType="create"
          itemType="transaction"
          handleClose={handleClose}
        />

        <section className="flex flex-col gap-4 px-6 py-5">
          <ModalFieldWrapper>
            <ModalFieldLabel label="Transaction type" />
            <SegmentedControl
              options={TYPE_CONFIG}
              selectedValue={selectedValue}
              handleSelect={setSelectedValue}
            />
          </ModalFieldWrapper>

          <div className="flex items-center justify-between">
            <ModalFieldWrapper>
              <ModalFieldLabel label="Transaction name" />
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
          </ModalFieldWrapper>

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
    </Dialog>
  );
}
