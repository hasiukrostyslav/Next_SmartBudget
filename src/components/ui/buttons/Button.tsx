import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  disabled?: boolean;
  color: keyof typeof buttonStyles.color;
  size: keyof typeof buttonStyles.size;
}

const buttonStyles = {
  color: {
    black:
      'bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500',
    blue: 'bg-blue-600 hover:bg-blue-500',
  },
  size: {
    sm: 'px-2 py-1 outline-round-sm',
    md: 'px-2 py-1.5 outline-round-sm',
    lg: 'px-3 py-2.5 outline-round-md',
  },
};

export default function Button({
  children,
  type = 'button',
  className,
  disabled,
  color,
  size,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-md text-slate-100',
        disabled ? 'bg-slate-400' : buttonStyles.color[color],
        buttonStyles.size[size],
        className,
      )}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
