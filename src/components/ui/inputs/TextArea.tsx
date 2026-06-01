import clsx from 'clsx';

interface TextAreaProps {
  placeholder?: string;
}

export default function TextArea({ placeholder }: TextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      className={clsx(
        'outline-input w-full text-slate-700 dark:text-slate-50',
        'border border-slate-300 dark:border-slate-400',
        'resize-none px-3 py-2',
      )}
    ></textarea>
  );
}
