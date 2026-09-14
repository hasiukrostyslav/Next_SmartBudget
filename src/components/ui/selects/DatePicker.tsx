import { useState } from 'react';

import { set } from 'date-fns';

import { SELECT_CONFIG } from '@/lib/constants/components';
import { useCalendar } from '@/hooks/useCalendar';
import { useSelectDropdown } from '@/hooks/useSelectDropdown';

import Button from '../buttons/Button';
import Calendar from './Calendar';
import PopoverPanel from './PopoverPanel';
import SelectTrigger from './SelectTrigger';
import SelectValue from './SelectValue';
import SelectWrapper from './SelectWrapper';
import TimeSelect from './TimeSelect';

interface DatePickerProps {
  label: string;
  selectedValue: Date;
  placeholder?: string;
  padding?: keyof typeof SELECT_CONFIG.padding;
  variant?: keyof typeof SELECT_CONFIG.variant;
  groupPosition?: 'start' | 'end';
  contentPosition?: 'top' | 'bottom';
  contentExpandedAlign?: 'left' | 'right';
  contentWidthExpandedTo?: string;
  disabled?: boolean;
  onSelect: (value: Date) => void;
}

export default function DatePicker({
  label,
  selectedValue,
  placeholder,
  padding = 'sm',
  variant = 'primary',
  groupPosition,
  contentPosition = 'top',
  contentExpandedAlign,
  contentWidthExpandedTo,
  disabled,
  onSelect,
}: DatePickerProps) {
  const { days, cursor, toNextMonth, toPrevMonth, goToMonth, formattedDate } =
    useCalendar(selectedValue);
  const {
    id,
    isContentExpanded,
    selectRef,
    handleBlur,
    handleToggleExpanded,
    handleClose,
  } = useSelectDropdown();

  const [draft, setDraft] = useState(selectedValue);

  // Calendar days are midnights. Keep the time already chosen: taking the day
  // as-is reset the transaction's time to 00:00 whenever a day was picked.
  const handleSelectDay = (day: Date) => {
    goToMonth(day);
    setDraft(
      set(day, {
        hours: draft.getHours(),
        minutes: draft.getMinutes(),
        seconds: draft.getSeconds(),
        milliseconds: draft.getMilliseconds(),
      }),
    );
  };

  const handleDone = () => {
    onSelect(draft);
    handleClose();
  };

  return (
    <SelectWrapper ref={selectRef} onBlur={handleBlur}>
      <SelectTrigger
        id={id}
        label={label}
        padding={padding}
        variant={variant}
        disabled={disabled}
        isContentExpanded={isContentExpanded}
        groupPosition={groupPosition}
        onClick={() => {
          handleToggleExpanded();
          // Reopen on the saved value, in its month, not on the last month browsed.
          setDraft(selectedValue);
          goToMonth(selectedValue);
        }}
        ariaHasPopup="dialog"
        iconName="calendar"
      >
        <SelectValue
          selectedValue={{ label: formattedDate, value: formattedDate }}
          placeholder={placeholder}
        />
      </SelectTrigger>

      <PopoverPanel
        role="dialog"
        ariaLabel={label}
        id={id}
        isContentExpanded={isContentExpanded}
        position={contentPosition}
        widthExpandedTo={contentWidthExpandedTo}
        expandedAlign={contentExpandedAlign}
      >
        <Calendar
          onSelect={handleSelectDay}
          cursor={cursor}
          selected={draft}
          days={days}
          toNextMonth={toNextMonth}
          toPrevMonth={toPrevMonth}
        />
        <TimeSelect selectedValue={draft} onChange={setDraft}>
          <Button
            color="blue"
            size="sm"
            onClick={handleDone}
            // Compare instants: two Date objects for the same moment are not ===.
            disabled={draft.getTime() === selectedValue.getTime()}
          >
            Done
          </Button>
        </TimeSelect>
      </PopoverPanel>
    </SelectWrapper>
  );
}
