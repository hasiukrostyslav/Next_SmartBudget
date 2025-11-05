import TransactionsFilters from '@/components/layouts/TransactionsFilters';
import TransactionsList from '@/components/layouts/TransactionsList';
import Pagination from '@/components/layouts/Pagination';

export default function TransactionsPage() {
  return (
    <section className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <TransactionsFilters />
      <TransactionsList />
      <Pagination />
    </section>
  );
}
