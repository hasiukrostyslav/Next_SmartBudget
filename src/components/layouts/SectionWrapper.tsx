import { clsx } from 'clsx';

export default function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={clsx(
        'rounded-md p-3',
        'border border-slate-300 bg-slate-100',
        'dark:border-slate-600 dark:bg-slate-800',
      )}
    >
      {children}
    </section>
  );
}
