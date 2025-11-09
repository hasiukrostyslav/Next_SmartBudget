'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon';

interface SortItemProps {
  label: string;
}

export default function SortItem({ label }: SortItemProps) {
  const [isAscending, setIsAscending] = useState(true);

  return (
    <div className="text-xs">
      <button
        onClick={() => setIsAscending(!isAscending)}
        type="button"
        className={clsx(
          'outline-round-sm flex items-center gap-1 rounded-md px-1.5 py-0.5',
          'text-slate-500 hover:bg-slate-300/40 dark:hover:bg-slate-700/40',
        )}
      >
        <span>{label}</span>
        <Icon
          name="arrow-up"
          size={12}
          className={clsx(
            'transition-all duration-300 ease-in',
            !isAscending ? 'rotate-180' : '',
          )}
        />
      </button>
    </div>
  );
}
