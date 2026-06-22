import { TRANSACTION_SEARCH_PARAMS } from '@/lib/constants/http';
import { getPageSizeOption } from '@/lib/utils/utils';

import Select from '../selects/Select';

interface PaginationFilterProps {
  totalCount: number;
  limit: number;
  itemsRange: {
    min: number;
    max: number;
  };
}

export default function PaginationFilter({
  totalCount,
  limit,
  itemsRange,
}: PaginationFilterProps) {
  const pageSizeOptions = getPageSizeOption(totalCount);

  return (
    <div className="flex items-center text-sm text-slate-500">
      <div className="border-r border-slate-300 px-3 dark:border-slate-700">
        <span className="font-semibold text-slate-600 dark:text-slate-300">
          {itemsRange.min}-{itemsRange.max}
        </span>{' '}
        of {totalCount}
      </div>

      <div className="flex items-center gap-2 px-3">
        <span>Rows per page</span>
        <Select
          label={TRANSACTION_SEARCH_PARAMS.LIMIT}
          param={TRANSACTION_SEARCH_PARAMS.LIMIT}
          options={pageSizeOptions}
          defaultValue={limit ? Number(limit) : pageSizeOptions[0]}
          width="sm"
          padding="xs"
          variant="secondary"
          contentPosition="top"
          disabled={pageSizeOptions.length === 1}
        />
      </div>
    </div>
  );
}
