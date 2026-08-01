'use client';

import { clsx } from 'clsx';

import { useFilters } from '@/hooks/useFilters';

import Button from '../ui/buttons/Button';
import ActiveFilter from '../ui/controls/ActiveFilter';
import Icon from '../ui/icons/Icon';

export default function ActiveFiltersContainer() {
  const { filters, clearAll, clearFilter } = useFilters();

  if (filters.length === 0) return null;

  return (
    <div
      className={clsx(
        'mt-4 border-t border-slate-300 pt-4 pb-1 dark:border-slate-600',
        'flex items-center justify-between',
      )}
    >
      <div className="flex items-center gap-2">
        <h4 className="text-sm text-slate-500">ACTIVE</h4>
        {filters.map((filter) => (
          <ActiveFilter
            key={filter.key + '=' + filter.value}
            filter={filter}
            onClick={clearFilter}
          />
        ))}
      </div>
      <Button color="transparent" size="xs" onClick={clearAll}>
        <Icon name="delete" size={14} />
        <span>Clear all</span>
        <span>( {filters.length} )</span>
      </Button>
    </div>
  );
}
