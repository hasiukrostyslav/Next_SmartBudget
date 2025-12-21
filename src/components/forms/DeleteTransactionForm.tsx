import { useTransition } from 'react';
import { deleteTransaction } from '@/lib/actions/transactionActions';
import Button from '../ui/buttons/Button';

interface DeleteTransactionFormProps {
  id: string;
  handleClose: () => void;
}

export default function DeleteTransactionForm({
  id,
  handleClose,
}: DeleteTransactionFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      await deleteTransaction(id);
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
