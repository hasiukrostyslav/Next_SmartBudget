// @vitest-environment jsdom
import { useState } from 'react';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import DatePicker from './DatePicker';

function Harness() {
  const [value, setValue] = useState(new Date(2026, 0, 15, 10, 30));
  return (
    <DatePicker label="Date & Time" selectedValue={value} onSelect={setValue} />
  );
}

const trigger = () => screen.getByRole('button', { name: /^Date & Time:/ });
const openPicker = () => fireEvent.click(trigger());
const done = () =>
  screen.getByRole('button', { name: 'Done' }) as HTMLButtonElement;

afterEach(cleanup);

describe('DatePicker', () => {
  it('keeps the chosen time when a different day is picked', () => {
    render(<Harness />);
    openPicker();
    fireEvent.click(screen.getByRole('button', { name: '16' }));
    fireEvent.click(done());

    expect(trigger().textContent).toContain('16.01.2026, 10:30');
  });

  it('disables Done again when the original day is picked back', () => {
    render(<Harness />);
    openPicker();

    expect(done().disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: '16' }));
    expect(done().disabled).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: '15' }));
    expect(done().disabled).toBe(true);
  });

  it("reopens on the selected date's month, not the last month browsed", () => {
    render(<Harness />);
    openPicker();
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('February 2026')).toBeTruthy();

    openPicker();
    openPicker();
    expect(screen.getByText('January 2026')).toBeTruthy();
  });
});
