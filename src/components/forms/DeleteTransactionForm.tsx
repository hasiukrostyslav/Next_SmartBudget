import { useTransition } from 'react';
import { deleteTransaction } from '@/lib/actions/transactionActions';
import Button from '../ui/buttons/Button';

interface DeleteTransactionFormProps {
  id: string;
}

export default function DeleteTransactionForm({
  id,
}: DeleteTransactionFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTransaction(id);
    });
  };

  return (
    <form onSubmit={handleDelete}>
      <Button type="submit" color="blue" size="sm" disabled={isPending}>
        Yes, Delete!
      </Button>
    </form>
  );
}
