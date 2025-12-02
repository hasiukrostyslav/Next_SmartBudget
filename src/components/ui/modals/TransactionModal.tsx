import Dialog from '@/components/layouts/Dialog';
import Button from '../buttons/Button';
import Input from '../inputs/Input';
import Select from '../selects/Select';
import TextArea from '../inputs/TextArea';
import RadioGroup from '../inputs/RadioGroup';
import InputLabel from '../inputs/InputLabel';
import {
  currency,
  transactionCategories,
  transactionStatus,
  transactionTypesOptions,
} from '@/lib/constants/ui';

interface TransactionModalProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  handleClose: () => void;
}

export default function TransactionModal({
  ref,
  handleClose,
}: TransactionModalProps) {
  return (
    <Dialog
      ref={ref}
      handleClose={handleClose}
      heading="Add new transaction"
      closeButton
    >
      <form className="flex flex-col gap-6 text-slate-700 dark:text-slate-50">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-medium">Select transaction&apos;s type:</h3>
          <RadioGroup
            name="transaction-type"
            options={transactionTypesOptions}
          />
        </div>
        <div className="flex items-center gap-6">
          <Input
            name="transaction"
            padding="sm"
            label="Transaction name"
            width="lg"
          />
          <div>
            <InputLabel label="Category" margin="sm" />
            <Select
              name="category"
              data={transactionCategories.map((c) => c.name)}
              placeholder="Chose category"
              width="lg"
            />
          </div>
        </div>
        <div className="flex gap-6">
          <Input
            name="payment method"
            padding="sm"
            label="Payment method"
            width="lg"
          />
          <div className="items-stretch">
            <InputLabel label="Status" margin="sm" />
            <Select
              name="status"
              data={transactionStatus}
              placeholder="Chose status"
              width="lg"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Input
            name="amount"
            padding="sm"
            label="Amount"
            type="number"
            width="lg"
          />
          <div>
            <InputLabel label="Currency" margin="sm" />
            <Select
              name="currency"
              data={currency.map((c) => c.currency)}
              placeholder="Chose currency"
              width="lg"
            />
          </div>
        </div>
        <div className="flex">
          <TextArea />
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <Button onClick={handleClose} size="md" color="outline">
            Cancel
          </Button>
          <Button color="blue" size="md">
            Create Transaction
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
