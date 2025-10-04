'use client';

import { useState } from 'react';
import Icon from './Icon';
import { inputIcons } from '@/_lib/constants';

interface InputProps {
  name: 'name' | 'email' | 'password';
  label?: string;
  error?: string;
  isPassword?: boolean;
  defaultValue: string | undefined;
  disabled?: boolean;
}

function setBorderColor({
  error,
  disabled,
}: Pick<InputProps, 'error' | 'disabled'>) {
  const styles = {
    default: 'border-slate-300',
    error: 'border-red-500',
    disabled: 'border-slate-200 dark:border-slate-500',
  };
  if (error) return styles.error;
  if (disabled) return styles.disabled;
  return styles.default;
}

export default function Input({
  name,
  label,
  error,
  isPassword,
  defaultValue,
  disabled,
}: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsVisible(isVisible ? false : true);
  }

  const borderColor = setBorderColor({ error, disabled });

  return (
    <div className="relative mb-4.5 flex flex-col gap-2">
      <label className="text-sm" htmlFor={name}>
        {label}
      </label>
      <input
        disabled={disabled}
        defaultValue={defaultValue}
        type={isPassword && !isVisible ? 'password' : 'text'}
        name={name}
        className={`outline-round-md border-2 py-2 ${borderColor} ${
          isPassword ? 'pr-10 pl-3' : 'px-3'
        }`}
      />
      <span className="absolute bottom-3.5 left-3">
        <Icon
          className="text-slate-400 dark:text-slate-400"
          size={18}
          name={inputIcons[name]}
        />
      </span>
      {isPassword && (
        <button
          type="button"
          className="outline-round-sm absolute right-3 bottom-3 h-4 w-4"
          onClick={handleClick}
        >
          <Icon
            className="text-slate-500 dark:text-slate-400"
            size={16}
            name={isVisible ? 'eye' : 'eye-off'}
          />
        </button>
      )}
      <span className="absolute -bottom-5.5 text-xs text-red-500">{error}</span>
    </div>
  );
}
