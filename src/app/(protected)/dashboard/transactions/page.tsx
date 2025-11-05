import TransactionsFilters from '@/components/ui/TransactionsFilters';
import TransactionsList from '@/components/ui/TransactionsList';
import Pagination from '@/components/ui/Pagination';

export default function TransactionsPage() {
  return (
    <section className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <TransactionsFilters />
      <TransactionsList />
      <Pagination />
    </section>
  );
}
