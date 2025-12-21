import { useTransition } from 'react';
import { deleteManyTransaction } from '@/lib/actions/transactionActions';
import Button from '../ui/buttons/Button';

interface DeleteManyTransactionFormProps {
  selectedItems: string[];
  handleClose: () => void;
}

export default function DeleteManyTransactionForm({
  selectedItems,
  handleClose,
}: DeleteManyTransactionFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      await deleteManyTransaction(selectedItems);
    });

    handleClose();
  };
  return (
    <form onSubmit={handleDelete}>
      <Button type="submit" color="blue" size="sm" disabled={isPending}>
        Yes, Delete!
      </Button>
    </form>
  );
}
