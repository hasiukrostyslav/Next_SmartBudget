'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { SelectOption } from '@/types/types';

import { STATUSES, TRANSACTION_CATEGORIES } from '@/lib/constants/enums';
import {
  CURRENCY_CONFIG,
  PAYMENT_METHODS,
  STATUS_CONFIG,
  TRANSACTION_CATEGORIES_CONFIG,
  TRANSACTION_TYPE_CONFIG,
} from '@/lib/constants/transactions';
import { createQueryString } from '@/lib/utils/utils';
import { useSearchInput } from '@/hooks/useSearchInput';

import Input from '../../inputs/Input';
import Select from '../../selects/Select';

interface FilterSelect {
  param: 'type' | 'status' | 'category' | 'currency' | 'account';
  label: string;
  width: string;
  options: SelectOption[];
  withSearch?: boolean;
}

const FILTER_SELECTS: FilterSelect[] = [
  {
    param: 'type',
    label: 'Type',
    width: 'w-32',
    options: TRANSACTION_TYPE_CONFIG.map((type) => ({
      value: type.option,
      label: type.option,
      icon: type.icon,
      color: type.color,
    })),
  },
  {
    param: 'status',
    label: 'Status',
    width: 'w-36',
    options: STATUSES.map((status) => ({
      value: status,
      label: STATUS_CONFIG[status].text.header,
      icon: STATUS_CONFIG[status].icon,
      color: STATUS_CONFIG[status].style.icon,
    })),
  },
  {
    param: 'category',
    label: 'Category',
    width: 'w-44',
    withSearch: true,
    options: TRANSACTION_CATEGORIES.map((category) => ({
      value: category,
      label: TRANSACTION_CATEGORIES_CONFIG[category].text.header,
      icon: TRANSACTION_CATEGORIES_CONFIG[category].icon,
      color: TRANSACTION_CATEGORIES_CONFIG[category].style.icon,
    })),
  },
  {
    param: 'currency',
    label: 'Currency',
    width: 'w-32',
    options: CURRENCY_CONFIG.map((currency) => ({
      value: currency.currency,
      label: currency.currency,
      description: currency.description,
    })),
  },
  {
    param: 'account',
    label: 'Account',
    width: 'w-32',
    options: PAYMENT_METHODS.map((method) => ({
      value: method,
      label: method,
    })),
  },
];

export default function TransactionsFilters() {
  const { searchQuery, role, handleChange, handleClear } = useSearchInput({
    isUpdateSearchParam: true,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Choosing a value replaces that filter; the chips below the toolbar show
  // what is applied and remove it again.
  const handleFilter = (param: string, value: string | number) => {
    const query = createQueryString(searchParams, [{ param, value }]);
    router.replace(`${pathname}?${query}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        name="search"
        padding="sm"
        placeholder="Search Transaction..."
        iconName="search"
        value={searchQuery}
        onChange={handleChange}
        trailingButton={{ role, onClick: handleClear }}
      />
      {FILTER_SELECTS.map((filter) => (
        <div key={filter.param} className={filter.width}>
          <Select
            label={filter.label}
            placeholder={filter.label}
            options={filter.options}
            selectedValue={searchParams.get(filter.param) ?? undefined}
            onSelect={(value) => handleFilter(filter.param, value)}
            padding="sm"
            showSelectedOption
            withSearch={filter.withSearch}
            contentWidthExpandedTo={filter.withSearch ? 'w-64' : 'min-w-max'}
          />
        </div>
      ))}
    </div>
  );
}
