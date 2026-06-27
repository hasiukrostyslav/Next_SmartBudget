import { clsx } from 'clsx';

import { SelectOption } from '@/types/types';

import Icon from '../icons/Icon';

type SelectOptionItemProps =
  | { option: SelectOption; context: 'value' }
  | {
      option: SelectOption;
      context: 'list';
      showSelectedOption: boolean;
      selectedValue: string | number | undefined;
    };

export default function SelectOptionItem(props: SelectOptionItemProps) {
  const { option, context } = props;
  return (
    <div
      className={clsx(
        'flex items-center gap-1.5',
        context === 'list' && 'w-full',
      )}
    >
      {option.color && (
        <div
          className={clsx('rounded-full', option.color, !option.icon && 'p-2')}
        >
          {option.icon && <Icon size={16} name={option.icon}></Icon>}
        </div>
      )}
      <span>{option.label}</span>
      {context === 'list' &&
        props.showSelectedOption &&
        props.selectedValue === option.value && (
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
