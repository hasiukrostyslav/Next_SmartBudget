import React from 'react';

import Icon from '../icons/Icon';
import Input from '../inputs/Input';

interface TimeSelectProps {
  selectedValue?: Date;
  children: React.ReactNode;
}

export default function TimeSelect({
  selectedValue,
  children,
}: TimeSelectProps) {
  const date = selectedValue ?? new Date();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return (
    <div className="flex gap-3 border-t border-slate-300 p-3 dark:border-slate-500">
      <div className="flex items-center gap-2 font-semibold text-slate-400">
        <Icon name="clock" size={14} />
        <h4>Time</h4>
      </div>
      <div className="flex items-center gap-1">
        <Input name="hour" type="number" padding="xs" value={hour} />
        <span className="font-bold">:</span>
        <Input name="minute" type="number" padding="xs" value={minute} />
      </div>
      {children}
    </div>
  );
}
