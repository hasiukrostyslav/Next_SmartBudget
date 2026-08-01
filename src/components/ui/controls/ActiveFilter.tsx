import { clsx } from 'clsx';
import { z } from 'zod';

import { FilterParamsSchema } from '@/lib/schemas/transaction.schema';

import ButtonIcon from '../buttons/ButtonIcon';

interface ActiveFilterProps {
  filter: { key: keyof z.infer<typeof FilterParamsSchema>; value: string };
}

export default function ActiveFilter({ filter }: ActiveFilterProps) {
  return (
    <div>
      <div
        className={clsx(
          'flex items-center gap-1 rounded-xl border py-0.5 pr-1 pl-2',
          'border-blue-400 bg-blue-200/20 dark:border-slate-600 dark:bg-slate-800',
        )}
      >
        <p className="text-sm text-blue-600 dark:text-blue-600">
          {filter.key.at(0)?.toUpperCase() + filter.key.slice(1)} :{' '}
          <span className="font-semibold">
            {filter.value
              .split('-')
              .map((value) => value.at(0)?.toUpperCase() + value.slice(1))
              .join(' ')}
          </span>
        </p>
        <div>
          <ButtonIcon
            iconName="close"
            shape="round"
            size={10}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
