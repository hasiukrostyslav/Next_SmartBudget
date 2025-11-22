'use client';

import clsx from 'clsx';
import { useRadioGroup } from '@/hooks/useRadioGroup';

interface RadioGroupProps {
  name: string;
  disabled?: boolean;
  options: { label: string; value: string }[];
}

export default function RadioGroup({
  name,
  disabled,
  options,
}: RadioGroupProps) {
  const { selected, handleSelect, setSelected } = useRadioGroup();

  return (
    <div className="grid grid-cols-2">
      {options.map((opt) => (
        <div className="flex" key={opt.value}>
          <label
            htmlFor={`${name}-${opt.value}`}
            className={clsx(
              'flex items-center gap-2 text-sm',
              'select-none',
              disabled ? 'cursor-default' : 'cursor-pointer',
              selected === opt.value && !disabled ? 'text-blue-600' : '',
            )}
          >
            <input
              type="radio"
              className="peer hidden"
              name={name}
              value={opt.value}
              checked={selected === opt.value}
              id={`${name}-${opt.value}`}
              disabled={disabled}
              onChange={handleSelect}
            />
            <span
              role="radio"
              aria-checked={selected === opt.value}
              aria-disabled={disabled}
              tabIndex={0}
              onKeyDown={(e) => {
                if ((!disabled && e.key === ' ') || e.key === 'Enter') {
                  e.preventDefault();
                  setSelected(opt.value);
                }
              }}
              className={clsx(
                'flex h-4 w-4 items-center justify-center rounded-full border-2',
                'outline-round-sm-ch outline-input',
                disabled
                  ? 'border-slate-500/20 bg-slate-500/20'
                  : 'border-slate-400 peer-checked:border-blue-600',
                '',
              )}
            >
              {selected === opt.value && !disabled && (
                <span
                  aria-checked
                  className="block h-2 w-2 rounded-full bg-blue-600"
                ></span>
              )}
            </span>
            {opt.label}
          </label>
        </div>
      ))}
    </div>
  );
}
