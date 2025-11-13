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
  name: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
  icon?: IconName;
  withButton?: boolean;
  withError?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'number' | 'password';
}

const styles = {
  padding: { sm: 'py-1.5 border', md: 'py-2 border-2', lg: 'py-2.5 border-2' },
};

export default function Input({
  name,
  label,
  error,
  disabled,
  placeholder,
  ref,
  icon,
  withButton,
  withError,
  padding = 'lg',
  type = 'text',
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
      {label && (
        <InputLabel label={label} htmlFor={`${name}-${id}`} margin={padding} />
      )}

      <div className="relative">
        {icon && <InputIcon name={icon} />}

        <input
          {...props}
          ref={ref}
          id={`${name}-${id}`}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          type={
            name === 'password' && !isVisible
              ? 'password'
              : type === 'number'
                ? 'number'
                : 'text'
          }
          min={0}
          className={clsx(
            'outline-input w-full text-sm tracking-wider',
            'text-slate-700 dark:text-slate-50 dark:placeholder:text-slate-400',
            withButton ? 'pr-10' : 'pr-3',
            icon ? 'pl-10' : 'pl-3',
            styles.padding[padding],
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
