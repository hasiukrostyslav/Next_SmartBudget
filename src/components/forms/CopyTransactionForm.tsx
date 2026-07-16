'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { TransactionItem } from '@/types/types';

import { createTransaction } from '@/lib/actions/transactionActions';
import { OperationType } from '@/lib/constants/enums';
import {
  CREATE_TRANSACTION_FIELDS,
  CURRENCY_CONFIG,
} from '@/lib/constants/transactions';
import { CopyTransactionSchema } from '@/lib/schemas/transaction.schema';
import { useToast } from '@/hooks/useToast';

import Input from '../ui/inputs/Input';
import TextArea from '../ui/inputs/TextArea';
import ModalFieldLabel from '../ui/modals/ModalFieldLabel';
import ModalFieldRow from '../ui/modals/ModalFieldRow';
import ModalFieldWrapper from '../ui/modals/ModalFieldWrapper';
import ModalFooter from '../ui/modals/ModalFooter';
import ModalHeader from '../ui/modals/ModalHeader';
import DatePicker from '../ui/selects/DatePicker';
import Select from '../ui/selects/Select';

type FormData = z.infer<typeof CopyTransactionSchema>;

interface CopyTransactionFormProps {
  sourceTransaction: TransactionItem;
  onClose: () => void;
}

export default function CopyTransactionForm({
  sourceTransaction,
  onClose,
}: CopyTransactionFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toastSuccess } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(CopyTransactionSchema),
    defaultValues: {
      createdAt: new Date(),
      amount: sourceTransaction.amount,
      currency: sourceTransaction.currency,
      description: sourceTransaction.description ?? '',
    },
  });

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await createTransaction({
        ...data,
        transactionName: sourceTransaction.transactionName,
        transactionType: sourceTransaction.transactionType,
        transactionCategory: sourceTransaction.transactionCategory,
        paymentMethod: sourceTransaction.paymentMethod,
        status: sourceTransaction.status,
      });
      if (result.success) {
        onClose();
        toastSuccess(OperationType.CREATE, 'Transaction');
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="flex flex-col dark:text-slate-400"
    >
      <ModalHeader
        operationType={OperationType.COPY}
        itemType="transaction"
        onClose={onClose}
      />

      <section className="flex flex-col gap-4 px-6 py-4">
        <ModalFieldRow>
          <ModalFieldWrapper>
            <ModalFieldLabel label={CREATE_TRANSACTION_FIELDS.DATE.label} />
            <Controller
              control={control}
              name={CREATE_TRANSACTION_FIELDS.DATE.name}
              render={({ field }) => (
                <DatePicker
                  label={CREATE_TRANSACTION_FIELDS.DATE.label}
                  selectedValue={field.value}
                  onSelect={field.onChange}
                  showSelectedOption
                  padding="md"
                />
              )}
            />
          </ModalFieldWrapper>

          <ModalFieldWrapper>
            <ModalFieldLabel
              label={`${CREATE_TRANSACTION_FIELDS.AMOUNT.label} & ${CREATE_TRANSACTION_FIELDS.CURRENCY.label}`}
            />
            <div className="flex items-center">
              <div className="flex-2">
                <Input
                  {...register(CREATE_TRANSACTION_FIELDS.AMOUNT.name)}
                  padding="md"
                  type="number"
                  step="any"
                  placeholder={CREATE_TRANSACTION_FIELDS.AMOUNT.placeholder}
                  groupPosition="end"
                />
              </div>
              <div className="flex-1">
                <Controller
                  control={control}
                  name={CREATE_TRANSACTION_FIELDS.CURRENCY.name}
                  render={({ field }) => (
                    <Select
                      label={CREATE_TRANSACTION_FIELDS.CURRENCY.name}
                      options={CURRENCY_CONFIG.map((el) => ({
                        value: el.currency,
                        label: el.currency,
                        description: el.description,
                      }))}
                      padding="md"
                      showSelectedOption
                      selectedValue={field.value}
                      onSelect={field.onChange}
                      groupPosition="start"
                      contentExpandedAlign="right"
                      contentWidthExpandedTo="min-w-max"
                    />
                  )}
                />
              </div>
            </div>
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
        operationType={OperationType.COPY}
        itemType="transaction"
        isSubmitting={isPending}
        onClose={onClose}
        disabled={!isValid}
      />
    </form>
  );
}
