import { clsx } from 'clsx';
import Icon from '../Icon';
import { STATUS_CONFIG } from '@/lib/constants/ui';

interface RadioCardProps {
  option: keyof typeof STATUS_CONFIG;
  selectedValue: string;
  isCurrent: boolean;
  handleSelect: (option: keyof typeof STATUS_CONFIG) => void;
}

export default function RadioCard({
  option,
  selectedValue,
  isCurrent,
  handleSelect,
}: RadioCardProps) {
  const config = STATUS_CONFIG[option];

  return (
    <label
      tabIndex={0}
      role="radio"
      className={clsx(
        'outline-input flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-2',
        selectedValue === option || (!selectedValue && isCurrent)
          ? config.card
          : `border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700`,
      )}
    >
      <div className={clsx('rounded-md p-1.5', config.iconColor)}>
        <Icon name={config.icon} size={20} />
      </div>
      <div>
        <h2 className="flex items-center gap-4 font-semibold dark:text-slate-300">
          {config.header}
          {isCurrent && (
            <span className="rounded-xl bg-slate-300 px-2 py-0.5 text-xs text-slate-700">
              CURRENT
            </span>
          )}
        </h2>
        <p className="text-xs text-slate-500">{config.description}</p>
      </div>
      <span
        className={clsx(
          'ml-auto h-4 w-4 rounded-full',
          selectedValue === option || (!selectedValue && isCurrent)
            ? config.radio + ' border-6'
            : 'border border-slate-300 dark:border-slate-700',
        )}
      ></span>
      <input
        type="radio"
        className="peer hidden"
        onChange={() => handleSelect(option)}
        name={option}
        value={option}
        checked={selectedValue === option}
      />
    </label>
  );
}
