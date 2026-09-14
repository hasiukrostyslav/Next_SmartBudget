import Image from 'next/image';

import clsx from 'clsx';

import { EMPTY_STATE_TEXT } from '@/lib/constants/messages';

import Button from '../buttons/Button';
import Icon from '../icons/Icon';

type EmptyStateEntry = (typeof EMPTY_STATE_TEXT)[keyof typeof EMPTY_STATE_TEXT];

interface EmptyStateProps {
  config: EmptyStateEntry;
  // The page's call to action, if it has a working one.
  children?: React.ReactNode;
  isFilterApplied?: boolean;
  clearFiltersHref?: string;
}

export default function EmptyState({
  config,
  children,
  isFilterApplied,
  clearFiltersHref,
}: EmptyStateProps) {
  const header = isFilterApplied
    ? config.noFilterResults.header
    : config.header;
  const description = isFilterApplied
    ? config.noFilterResults.description
    : config.description;

  return (
    <section
      className={clsx(
        'row-span-full flex h-full flex-col items-center justify-center',
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          className="h-[140] w-[140]"
          alt="Error"
          src="/error-404.png"
          width={140}
          height={140}
          priority
        />
        {header && (
          <h2
            className={clsx(
              'mt-4 text-xl leading-snug font-bold tracking-wider',
            )}
          >
            {header}
          </h2>
        )}
      </div>
      <div
        className={clsx(
          'mt-2 flex w-full max-w-md flex-col items-center justify-center gap-3 px-4 text-center',
        )}
      >
        {description && <p className="text-slate-500">{description}</p>}
        {isFilterApplied
          ? clearFiltersHref && (
              <Button color="blue" size="sm" href={clearFiltersHref}>
                <Icon name="undo" size={14} />
                <span>Clear all filters</span>
              </Button>
            )
          : children}
      </div>
    </section>
  );
}
