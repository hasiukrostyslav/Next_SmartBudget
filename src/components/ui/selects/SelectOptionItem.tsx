import { clsx } from 'clsx';

import { SelectOption } from '@/types/types';

import Icon from '../icons/Icon';

interface SelectOptionProps {
  option: SelectOption;
  context: 'list' | 'value';
  showSelectedOption?: boolean;
  selectedValue?: string | number | undefined;
}

export default function SelectOptionItem({
  option,
  context,
  showSelectedOption,
  selectedValue,
}: SelectOptionProps) {
  return (
    <div className="flex w-full items-center gap-1.5">
      {option.color && (
        <div
          className={clsx('rounded-full', option.color, !option.icon && 'p-2')}
        >
          {option.icon && <Icon size={16} name={option.icon}></Icon>}
        </div>
      )}

      <span>{option.label}</span>

      {showSelectedOption &&
        context === 'list' &&
        selectedValue === option.value && (
          <div className="ml-auto">
            <Icon
              name="check"
              size={16}
              className="text-blue-700 dark:text-blue-400"
            />
          </div>
        )}
    </div>
  );
}
