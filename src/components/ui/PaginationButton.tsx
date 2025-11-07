import Link from 'next/link';
import Icon from './Icon';
import clsx from 'clsx';

interface PaginationButtonProps {
  href: string;
  page: 'prev' | 'next' | number;
  active?: boolean;
  disable?: boolean;
}

const styles = {
  default: 'hover:bg-slate-300/30 dark:hover:bg-slate-600/30',
  active: 'bg-slate-500/20 hover:bg-slate-500/30 dark:bg-slate-600',
  disable: `cursor-default dark:border-slate-700 border-slate-300 
  text-slate-300 dark:text-slate-700`,
};

export default function PaginationButton({
  href,
  page,
  active,
  disable,
}: PaginationButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex h-7 w-7 items-center justify-center p-1 transition-[hover] duration-300',
        'outline-round-md rounded-md border text-sm',
        !disable
          ? 'border-slate-400 text-slate-600 dark:border-slate-500 dark:text-slate-300'
          : '',
        !active && !disable && styles.default,
        active ? styles.active : '',
        disable ? styles.disable : '',
      )}
    >
      {typeof page === 'string' ? (
        <Icon
          size={16}
          name={page === 'prev' ? 'chevron-left' : 'chevron-right'}
        />
      ) : (
        page
      )}
    </Link>
  );
}
