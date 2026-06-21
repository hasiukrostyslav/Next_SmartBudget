import { useSearchParams } from 'next/navigation';

import { TRANSACTION_SEARCH_PARAMS } from '@/lib/constants/http';
import { getPageSizeOption } from '@/lib/utils/utils';

import Select from '../selects/Select';

interface PaginationFilterProps {
  totalCount: number;
}

export default function PaginationFilter({
  totalCount,
}: PaginationFilterProps) {
  const searchParams = useSearchParams();
  const limit = searchParams.get(TRANSACTION_SEARCH_PARAMS.LIMIT);

  const pageSizeOptions = getPageSizeOption(totalCount);

  return (
    <div className="flex items-center gap-2">
      <span>Showing</span>
      <Select
        label={TRANSACTION_SEARCH_PARAMS.LIMIT}
        param={TRANSACTION_SEARCH_PARAMS.LIMIT}
        options={pageSizeOptions}
        defaultValue={limit ? Number(limit) : pageSizeOptions[0]}
        width="sm"
        variant="secondary"
        contentPosition="top"
        disabled={pageSizeOptions.length === 1}
      />
      <span>out of {totalCount}</span>
    </div>
  );
}
