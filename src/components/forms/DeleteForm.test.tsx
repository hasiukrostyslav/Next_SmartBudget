// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import type { TransactionItem } from '@/types/types';

import DeleteForm from './DeleteForm';

const toastSuccess = vi.fn();
vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({ toastSuccess, toastError: vi.fn() }),
}));

afterEach(cleanup);

it('names the item type in the toast', async () => {
  const item = {
    transactionId: 'cjld2cjxh0000qzrmn831i7rn',
    transactionName: 'Rent',
    amount: 100,
    currency: 'UAH',
    transactionType: 'Expenses',
  } as TransactionItem;

  render(
    <DeleteForm
      itemType="payment"
      items={[item]}
      onClose={() => {}}
      onSubmit={async () => ({ success: true, status: 200, data: null })}
    />,
  );

  fireEvent.click(screen.getByRole('button', { name: /Delete payment/ }));

  await waitFor(() =>
    expect(toastSuccess).toHaveBeenCalledWith('delete', 'Payment'),
  );
});
