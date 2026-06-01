import { clsx } from 'clsx';

import { TOAST_CONFIG } from '@/lib/constants/ui';

import Icon from '../icons/Icon';

interface ToastProps {
  role: keyof typeof TOAST_CONFIG;
  operation: keyof typeof TOAST_CONFIG.success.header;
  entity: string;
}

export default function Toast({ role, operation, entity }: ToastProps) {
  const config = TOAST_CONFIG[role];

  const header = config.header[operation].replace('{x}', entity);
  const description = config.description[operation].replace('{x}', entity);

  return (
    <div
      className={clsx(
        'flex w-full items-center gap-3 rounded-md border border-l-4',
        config.style.border,
      )}
    >
      <div className={clsx('rounded-md p-1.5', config.style.icon)}>
        <Icon name={config.icon} size={16} />
      </div>
      <div>
        <h2 className="flex items-center gap-2 font-semibold">{header}</h2>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}
