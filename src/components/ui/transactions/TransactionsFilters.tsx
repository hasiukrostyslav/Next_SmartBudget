import { SelectFilters } from '@/lib/constants/constants';
import SearchForm from '@/components/forms/SearchForm';
import Select from '../selects/Select';
import TransactionsCTA from './TransactionsCTA';

export default function TransactionsFilters() {
  const { category, account, type } = SelectFilters;

  return (
    <div className="flex items-center gap-4 px-1">
      <SearchForm size="md" placeholder="Search Transaction" />

      <div className="ml-5 flex items-center gap-2">
        <Select
          name={category.name}
          label="All Categories"
          data={category.types}
        />
        <Select name={account.name} label="All Accounts" data={account.types} />
        <Select name={type.name} label="All types" data={type.types} />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Select name="date" label="Date" data={[]} />
        <TransactionsCTA buttonSize="md" iconSize={16} />
      </div>
    </div>
  );
}
