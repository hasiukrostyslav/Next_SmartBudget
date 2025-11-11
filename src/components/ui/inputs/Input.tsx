'use client';

import { useId, useState } from 'react';
import clsx from 'clsx';
import { setBorderColor } from '@/lib/utils/ui';
import { IconName } from '@/types/types';
import InputError from './InputError';
import InputButton from './InputButton';
import InputIcon from './InputIcon';
import InputLabel from './InputLabel';

interface InputProps {
  name: IconName;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  withIcon?: boolean;
  withButton?: boolean;
  withError?: boolean;
}

export default function Input({
  name,
  label,
  error,
  disabled,
  placeholder,
  ref,
  withIcon,
  withButton,
  withError,
  ...props
}: InputProps) {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsVisible(isVisible ? false : true);
  }

  const borderColor = setBorderColor({ error, disabled });

  return (
    <div className={clsx('relative', withError ? 'mb-4.5' : '')}>
      {label && <InputLabel label={label} htmlFor={`${name}-${id}`} />}

      <div className="relative">
        {withIcon && <InputIcon name={name} />}

        <input
          {...props}
          ref={ref}
          id={`${name}-${id}`}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          type={name === 'password' && !isVisible ? 'password' : 'text'}
          className={clsx(
            'outline-input w-full border-2 py-2.5 text-sm tracking-wider',
            'text-slate-700 dark:text-slate-50 dark:placeholder:text-slate-400',
            withButton ? 'pr-10' : 'pr-3',
            withIcon ? 'pl-10' : 'pl-3',
            borderColor,
          )}
        />

        {withButton && (
          <InputButton isVisible={isVisible} onClick={handleClick} />
        )}
      </div>

      {error && <InputError message={error} />}
    </div>
  );
}
