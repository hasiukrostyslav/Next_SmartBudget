import { createTransaction } from '@/lib/actions/transactionActions';
import { TRANSACTION_CATEGORIES } from '@/lib/constants/ui';
import { NextResponse } from 'next/server';

const INCOME_CATEGORIES = ['income', 'investments', 'prize', 'currency exchange'] as const;

function getCategoryType(categoryKey: string): 'Income' | 'Expenses' {
  return INCOME_CATEGORIES.includes(categoryKey as any) ? 'Income' : 'Expenses';
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const results = await Promise.allSettled(
    Object.entries(TRANSACTION_CATEGORIES).map(([key, category]) =>
      createTransaction({
        transactionName: category.header,
        transactionCategory: key as keyof typeof TRANSACTION_CATEGORIES,
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
