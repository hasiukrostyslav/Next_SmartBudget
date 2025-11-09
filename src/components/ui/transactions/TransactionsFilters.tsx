import { transactionsFilters } from '@/lib/constants/constants';
import SearchForm from '@/components/forms/SearchForm';
import Button from '../buttons/Button';
import Select from '../selects/Select';
import Icon from '../Icon';

export default function TransactionsFilters() {
  const [category, account, type] = transactionsFilters.filters;

  return (
    <div className="flex items-center gap-4 px-1">
      <SearchForm size="md" placeholder="Search Transaction" />

      <div className="ml-5 flex items-center gap-2">
        <Select
          name={category.name}
          heading="All Categories"
          data={category.types}
        />
        <Select
          name={account.name}
          heading="All Accounts"
          data={account.types}
        />
        <Select name={type.name} heading="All types" data={type.types} />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Select name="date" heading="Date" data={[]} />
        <Button
          className="flex items-center gap-0.5 text-sm"
          color="blue"
          size="md"
        >
          <Icon name="plus" size={16} />
          <span>Create</span>
        </Button>
      </div>
    </div>
  );
}
