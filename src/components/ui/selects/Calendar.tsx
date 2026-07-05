import { clsx } from 'clsx';
import { format, isSameDay, isSameMonth, isToday } from 'date-fns';

import ButtonIcon from '../buttons/ButtonIcon';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

interface CalendarProps {
  cursor: Date;
  days: Date[];
  onSelect: (value: Date) => void;
  toPrevMonth: () => void;
  toNextMonth: () => void;
}

export default function Calendar({
  cursor,
  days,
  onSelect,
  toPrevMonth,
  toNextMonth,
}: CalendarProps) {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <ButtonIcon
          iconName="chevron-left"
          size={16}
          shape="square"
          variant="outline"
          className="outline-input"
          onClick={toPrevMonth}
        />
        <p className="font-bold">{format(cursor, 'LLLL yyyy')}</p>
        <ButtonIcon
          iconName="chevron-right"
          size={16}
          shape="square"
          variant="outline"
          onClick={toNextMonth}
        />
      </div>

      <div
        className={clsx(
          'mt-4 grid grid-cols-7 justify-items-center gap-4',
          'font-semibold text-slate-500',
        )}
      >
        {WEEKDAYS.map((day) => (
          <span key={day} className="text-xs">
            {day}
          </span>
        ))}
      </div>

      <div className={clsx('mt-5 grid grid-cols-7 justify-items-center gap-2')}>
        {days.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => onSelect(day)}
            className={clsx(
              'flex h-7 w-7 items-center justify-center rounded-md font-semibold',
              'outline-round-sm',
              !isSameMonth(day, cursor)
                ? 'text-slate-300 dark:text-slate-700'
                : '',
              isSameDay(day, cursor)
                ? 'bg-blue-500 text-slate-100'
                : 'hover:bg-slate-200 dark:hover:bg-slate-600',
              isToday(day) && !isSameDay(day, cursor) ? 'text-blue-600' : '',
            )}
          >
            {format(day, 'd')}
            {isToday(day) && !isSameDay(day, cursor) && (
              <span
                className={clsx(
                  'h-1 w-1 rounded-full bg-blue-600',
                  '-translate-x-1.5 translate-y-3',
                )}
              ></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
