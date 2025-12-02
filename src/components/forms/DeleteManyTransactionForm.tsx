import { useTransition } from 'react';
import { deleteManyTransaction } from '@/lib/actions/transactionActions';
import Button from '../ui/buttons/Button';

interface DeleteManyTransactionFormProps {
  selectedItems: string[];
}

export default function DeleteManyTransactionForm({
  selectedItems,
}: DeleteManyTransactionFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteManyTransaction(selectedItems);
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
