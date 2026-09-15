// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import ButtonIcon from './buttons/ButtonIcon';
import CheckBox from './controls/CheckBox';
import SegmentedControl from './controls/SegmentedControl';
import Input from './inputs/Input';
import TextArea from './inputs/TextArea';
import Select from './selects/Select';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard/transactions',
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

afterEach(cleanup);

describe('accessible names', () => {
  it('names an icon-only button by its label', () => {
    render(
      <ButtonIcon
        iconName="close"
        label="Close"
        size={14}
        shape="square"
        variant="ghost"
      />,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeTruthy();
  });

  it('names a field without a visible label', () => {
    render(<Input name="search" ariaLabel="Search transactions" />);
    expect(
      screen.getByRole('textbox', { name: 'Search transactions' }),
    ).toBeTruthy();
  });

  it('prefers the visible label when there is one', () => {
    render(<Input name="email" label="Email address" ariaLabel="ignored" />);
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeTruthy();
  });

  it('names a textarea', () => {
    render(<TextArea name="description" ariaLabel="Description" />);
    expect(screen.getByRole('textbox', { name: 'Description' })).toBeTruthy();
  });

  it('names a select trigger by its field and current value', () => {
    render(
      <Select
        label="Currency"
        options={[{ value: 'UAH', label: 'UAH' }]}
        selectedValue="UAH"
        showSelectedOption
        onSelect={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: 'Currency: UAH' })).toBeTruthy();
  });

  it('exposes one named checkbox, not the hidden native input as well', () => {
    render(
      <CheckBox
        name="coffee"
        label="Select Coffee"
        checked={false}
        onChange={() => {}}
      />,
    );
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    expect(
      screen.getByRole('checkbox', { name: 'Select Coffee' }),
    ).toBeTruthy();
  });

  it('groups segmented options and marks the chosen one', () => {
    render(
      <SegmentedControl
        label="Type"
        selectedValue="Income"
        onSelect={() => {}}
        options={[
          { option: 'Income', icon: 'arrow-up', color: 'text-green-500' },
          { option: 'Expenses', icon: 'arrow-down', color: 'text-red-500' },
        ]}
      />,
    );
    expect(screen.getByRole('radiogroup', { name: 'Type' })).toBeTruthy();
    expect(
      screen
        .getByRole('radio', { name: 'Income' })
        .getAttribute('aria-checked'),
    ).toBe('true');
  });
});

describe('validation errors', () => {
  it('marks the field invalid and links it to the announced message', () => {
    render(
      <Input
        name="email"
        label="Email address"
        error="Please enter a valid email."
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Email address' });
    expect(input.getAttribute('aria-invalid')).toBe('true');

    const describedBy = input.getAttribute('aria-describedby');
    expect(
      describedBy && document.getElementById(describedBy)?.textContent,
    ).toBe('Please enter a valid email.');
    expect(screen.getByRole('alert').textContent).toBe(
      'Please enter a valid email.',
    );
  });

  it('is not marked invalid without an error', () => {
    render(<Input name="email" label="Email address" />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    expect(input.hasAttribute('aria-invalid')).toBe(false);
    expect(input.hasAttribute('aria-describedby')).toBe(false);
  });
});
