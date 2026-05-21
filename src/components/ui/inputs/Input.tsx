'use client';

import { useId } from 'react';
import clsx from 'clsx';
import { useShowPassword } from '@/hooks/useShowPassword';
import { IconName } from '@/types/types';
import InputError from './InputError';
import InputButton from './InputButton';
import InputIcon from './InputIcon';
import InputLabel from './InputLabel';
import { INPUT_CONFIG } from '@/lib/constants/ui';

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
  padding?: keyof typeof INPUT_CONFIG.padding;
  type?: 'text' | 'number' | 'password';
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

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
  value,
  onChange,
  ...props
}: InputProps) {
  const id = useId();
  const { isPasswordShown, handleClick } = useShowPassword();

  const borderColor = INPUT_CONFIG.border;

  return (
    <div className={clsx('relative', withError ? 'mb-4.5' : '')}>
      {label && (
        <InputLabel label={label} htmlFor={`${name}-${id}`} margin={padding} />
      )}

      <div className="relative">
        {icon && <InputIcon name={icon} padding={padding} />}

        <input
          {...props}
          ref={ref}
          id={`${name}-${id}`}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          onChange={onChange}
          type={
            name === 'password' && !isPasswordShown
              ? 'password'
              : type === 'number'
                ? 'number'
                : 'text'
          }
          min={0}
          className={clsx(
            'outline-input w-full text-sm tracking-wider',
            'text-slate-700 dark:text-slate-300 dark:placeholder:text-slate-600',
            withButton ? 'pr-10' : 'pr-3',
            icon ? INPUT_CONFIG.iconPadding[padding] : 'pl-3',
            padding === 'lg' ? 'border-2' : 'border',
            INPUT_CONFIG.padding[padding],
            error
              ? borderColor.error
              : disabled
                ? borderColor.disabled
                : borderColor.default,
          )}
        />

        {withButton && (
          <InputButton
            isPasswordShown={isPasswordShown}
            onClick={handleClick}
          />
        )}
      </div>

      {error && <InputError message={error} />}
    </div>
  );
}
