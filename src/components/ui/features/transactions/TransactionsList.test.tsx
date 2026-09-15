// @vitest-environment jsdom
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import type { TransactionItem } from '@/types/types';

// Stand-ins for the row, header and bulk actions: this test is about where the
// list puts the toolbar, not what the rows render.
vi.mock('./TransactionsItem', () => ({
  default: ({ onToggleSelect }: { onToggleSelect: () => void }) => (
    <div role="row">
      <button type="button" onClick={onToggleSelect}>
        select
      </button>
    </div>
  ),
}));
vi.mock('./TransactionsSort', () => ({ default: () => <div role="row" /> }));
vi.mock('./TransactionBulkActionButtons', () => ({ default: () => null }));

const { default: TransactionsList } = await import('./TransactionsList');

afterEach(cleanup);

it('keeps the bulk toolbar out of the table and announces the selection', () => {
  const item = {
    transactionId: 'cjld2cjxh0000qzrmn831i7rn',
  } as TransactionItem;
  const { container } = render(<TransactionsList data={[item]} />);

  act(() => screen.getByRole('button', { name: 'select' }).click());

  const table = container.querySelector('[role="table"]')!;
  const clearSelection = screen.getByRole('button', {
    name: 'Clear selection',
  });
  expect(table.contains(clearSelection)).toBe(false);
  expect(screen.getByRole('status').textContent).toBe('1 selected');
});
