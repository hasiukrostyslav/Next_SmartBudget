import SearchForm from '@/components/forms/SearchForm';
import Select from '../selects/Select';
import TransactionsCTA from './TransactionsCTA';
import { transactionCategories, transactionTypes } from '@/lib/constants/ui';

export default function TransactionsFilters() {
  return (
    <div className="flex items-center gap-4 px-1">
      <SearchForm size="md" placeholder="Search Transaction" />

      <div className="ml-5 flex items-center gap-2">
        <Select
          name="categories"
          data={transactionCategories.map((c) => c.name)}
          defaultOption="all"
          width="lg"
        />
        <Select name="accounts" data={[]} defaultOption="all" />
        <Select
          name="types"
          data={transactionTypes.map((c) => c.name)}
          defaultOption="all"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* <Select name="date" defaultOption="" data={[]} /> */}
        <TransactionsCTA buttonSize="md" iconSize={16} />
      </div>
    </div>
  );
}
