import clsx from 'clsx';

interface TextAreaProps {
  name: string;
  placeholder?: string;
  // Accessible name; the modal field label above is not a <label>.
  ariaLabel?: string;
}

export default function TextArea({
  name,
  placeholder,
  ariaLabel,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      {...props}
      name={name}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={clsx(
        'outline-input w-full text-slate-700 dark:text-slate-50',
        'border border-slate-300 text-sm dark:border-slate-400',
        'resize-none px-3 py-2 dark:placeholder:text-slate-600',
      )}
    ></textarea>
  );
}
