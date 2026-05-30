import { NextResponse } from 'next/server';

import { createTransaction } from '@/lib/actions/transactionActions';
import { TransactionCategories, TransactionType } from '@/lib/constants/enums';
import { TRANSACTION_CATEGORIES_CONFIG } from '@/lib/constants/ui';

const INCOME_CATEGORIES = [
  'income',
  'investments',
  'prize',
  'currency_exchange',
] as const;

function getCategoryType(categoryKey: string): TransactionType {
  return INCOME_CATEGORIES.includes(categoryKey as any) ? 'Income' : 'Expenses';
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const results = await Promise.allSettled(
    Object.entries(TRANSACTION_CATEGORIES_CONFIG).map(([key, category]) =>
      createTransaction({
        transactionName: category.text.header,
        transactionCategory: key as TransactionCategories,
        transactionType: getCategoryType(key),
        paymentMethod: 'Card',
        currency: 'USD',
        amount: 100,
        status: 'COMPLETED',
      }),
    ),
  );

  const succeeded = results.filter((r) => r.status === 'fulfilled').length;
  const failed = results.filter((r) => r.status === 'rejected').length;

  return NextResponse.json({ succeeded, failed, total: results.length });
}
