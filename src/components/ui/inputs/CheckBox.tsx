'use client';

import clsx from 'clsx';
import useCheckbox from '@/hooks/useCheckbox';
import Icon from '../Icon';

interface CheckBoxProps {
  name: string;
  disabled?: boolean;
}

export default function CheckBox({ name, disabled }: CheckBoxProps) {
  const { checked, toggleCheck, toggleCheckOnKey } = useCheckbox();

  return (
    <label className="cursor-pointer select-none">
      <input
        type="checkbox"
        className="peer hidden"
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={toggleCheck}
      />
      <span
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        tabIndex={!disabled ? 0 : -1}
        onKeyDown={toggleCheckOnKey}
        className={clsx(
          'flex h-4 w-4 items-center justify-center rounded-sm border',
          'outline-round-sm-ch outline-input border-slate-500',
          '[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100',
          disabled
            ? 'cursor-default bg-slate-200 text-slate-400'
            : 'peer-checked:border-blue-400 peer-checked:bg-blue-400 peer-checked:text-slate-50',
        )}
      >
        <Icon name="check" size={14} aria-checked />
      </span>
    </label>
  );
}
