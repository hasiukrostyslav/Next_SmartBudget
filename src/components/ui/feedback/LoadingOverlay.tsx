import clsx from 'clsx';

import Spinner from './Spinner';

interface LoadingOverlayProps {
  title?: string;
  subtitle?: string;
}

export default function LoadingOverlay({
  title,
  subtitle,
}: LoadingOverlayProps) {
  return (
    <div
      className={clsx(
        'row-span-full flex h-full w-full flex-col items-center justify-center',
        'absolute top-0 left-0 gap-4 rounded-2xl select-none',
        'bg-slate-100/80 dark:bg-slate-900/80',
      )}
    >
      <Spinner size={52} />
      {title && (
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            {title}
          </span>
          {subtitle && (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
