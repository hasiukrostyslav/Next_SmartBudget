import { createTransaction } from '@/lib/actions/transactionActions';
import { transactionCategories } from '@/lib/constants/ui';
import { NextResponse } from 'next/server';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const results = await Promise.allSettled(
    transactionCategories.map((category) =>
      createTransaction({
        transactionName: category.name
          .split(' ')
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(' '),
        transactionCategory: category.name,
        transactionType:
          category.type === 'income' ? 'Income' : 'Expenses',
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
