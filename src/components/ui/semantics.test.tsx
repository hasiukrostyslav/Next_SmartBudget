// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import SortButton from './buttons/SortButton';
import TransactionsSort from './features/transactions/TransactionsSort';
import TransactionStatus from './features/transactions/TransactionStatus';
import ModalFieldLabel from './modals/ModalFieldLabel';
import Select from './selects/Select';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard/transactions',
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams('sort=amount&order=asc'),
}));

afterEach(cleanup);

describe('document semantics', () => {
  it('does not use headings for labels and badges', () => {
    render(
      <>
        <ModalFieldLabel label="Amount" />
        <TransactionStatus status="PENDING" />
      </>,
    );
    expect(screen.queryAllByRole('heading')).toHaveLength(0);
  });

  it('points the select trigger at its listbox', () => {
    render(
      <Select
        label="Currency"
        options={[
          { value: 'UAH', label: 'UAH' },
          { value: 'USD', label: 'USD' },
        ]}
        selectedValue="UAH"
        showSelectedOption
        onSelect={() => {}}
      />,
    );
    const trigger = screen.getByRole('button', { name: 'Currency: UAH' });
    const controlled = document.getElementById(
      trigger.getAttribute('aria-controls') ?? '',
    );
    expect(controlled).not.toBeNull();
    expect(
      within(controlled as HTMLElement).getAllByRole('option', {
        hidden: true,
      }),
    ).toHaveLength(2);
    expect(screen.queryByRole('combobox')).toBeNull();
  });
});

describe('transactions table header', () => {
  it('is a row of column headers, one per column', () => {
    render(
      <TransactionsSort isAllSelected={false} onToggleSelectAll={() => {}} />,
    );
    const row = screen.getByRole('row');
    expect(within(row).getAllByRole('columnheader')).toHaveLength(9);
  });

  it('marks only the sorted column with its direction', () => {
    render(
      <>
        <SortButton
          name="Amount"
          label="amount"
          isActive
          order="asc"
          onClick={() => {}}
        />
        <SortButton
          name="Date"
          label="date"
          isActive={false}
          order="asc"
          onClick={() => {}}
        />
      </>,
    );
    const [amount, date] = screen.getAllByRole('columnheader');
    expect(amount.getAttribute('aria-sort')).toBe('ascending');
    expect(date.hasAttribute('aria-sort')).toBe(false);
  });
});
