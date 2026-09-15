import Link from 'next/link';

import clsx from 'clsx';

import Icon from '../icons/Icon';

interface PaginationButtonProps {
  href: string;
  page: 'prev' | 'next' | number;
  active?: boolean;
  disabled?: boolean;
}

const styles = {
  default:
    'hover:bg-slate-200/50 dark:hover:bg-slate-600/30 bg-slate-100 dark:bg-slate-700 text-slate-700',
  active: 'bg-blue-500 cursor-default dark:bg-blue-700 text-slate-200',
  disable:
    'cursor-default dark:border-slate-700 border-slate-300 text-slate-300 dark:text-slate-700',
};

export default function PaginationButton({
  href,
  page,
  active,
  disabled,
}: PaginationButtonProps) {
  const label =
    page === 'prev'
      ? 'Previous page'
      : page === 'next'
        ? 'Next page'
        : `Page ${page}`;

  const className = clsx(
    'flex h-7 w-7 items-center justify-center p-1 font-semibold',
    'outline-input rounded-md border text-sm select-none',
    !active && !disabled && styles.default,
    active ? styles.active : '',
    disabled
      ? styles.disable
      : 'border-slate-300 dark:border-slate-500 dark:text-slate-300',
  );

  const content =
    typeof page === 'string' ? (
      <Icon
        size={16}
        name={page === 'prev' ? 'chevron-left' : 'chevron-right'}
      />
    ) : (
      page
    );

  // The current page and an unavailable previous/next page lead nowhere. They
  // were <a href="#">, a link to the top of the page for anything that
  // activated it; now they are announced as disabled links.
  if (active || disabled)
    return (
      <span
        role="link"
        aria-disabled="true"
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        className={className}
      >
        {content}
      </span>
    );

  return (
    <Link href={href} aria-label={label} className={className}>
      {content}
    </Link>
  );
}
