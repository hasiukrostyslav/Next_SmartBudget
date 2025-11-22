import { getAllTransactions } from '@/lib/actions/transactionActions';
import TransactionsFilters from '@/components/ui/transactions/TransactionsFilters';
import TransactionsList from '@/components/ui/transactions/TransactionsList';
import PaginationTable from '@/components/ui/pagination/PaginationTable';
import EmptyState from '@/components/ui/EmptyState';
import TransactionsCTA from '@/components/ui/transactions/TransactionsCTA';

export default async function TransactionsPage() {
  const result = await getAllTransactions();

  if (result.error || !result.data) return null;

  if (result.data && result?.data?.length < 1)
    return (
      <EmptyState>
        <TransactionsCTA buttonSize="lg" iconSize={20} />
      </EmptyState>
    );
  else
    return (
      <section className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
        <TransactionsFilters />
        <TransactionsList data={result.data} />
        <PaginationTable />
      </section>
    );
}
