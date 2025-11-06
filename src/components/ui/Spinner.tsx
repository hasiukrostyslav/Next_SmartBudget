import clsx from 'clsx';
import Icon from './Icon';

export default function Spinner() {
  return (
    <div
      className={clsx(
        'row-span-full flex h-full w-full flex-col items-center justify-center',
        'absolute top-0 left-0 gap-6 rounded-2xl select-none',
        'bg-slate-100/80 dark:bg-slate-600/70',
      )}
    >
      <Icon
        name="loader"
        size={120}
        className="animate-spin-slow text-blue-400 dark:text-blue-500"
      />
      <span className="text-2xl text-blue-400 dark:text-blue-500">
        Loading...
      </span>
    </div>
  );
}
