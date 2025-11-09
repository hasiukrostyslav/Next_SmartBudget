import TransactionsFilters from '@/components/ui/transactions/TransactionsFilters';
import TransactionsList from '@/components/ui/transactions/TransactionsList';
import PaginationTable from '@/components/ui/pagination/PaginationTable';

export default function TransactionsPage() {
  return (
    <section className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <TransactionsFilters />
      <TransactionsList />
      <PaginationTable />
    </section>
  );
}
