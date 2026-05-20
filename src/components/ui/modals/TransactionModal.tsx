import Dialog from './Dialog';
import Button from '../buttons/Button';
import Input from '../inputs/Input';
import Select from '../selects/Select';
import TextArea from '../inputs/TextArea';
import RadioGroup from '../inputs/RadioGroup';
import InputLabel from '../inputs/InputLabel';
import {
  currency,
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
    <Dialog ref={ref}>
      <form className="flex flex-col gap-6 text-slate-700 dark:text-slate-50"></form>
    </Dialog>
  );
}
