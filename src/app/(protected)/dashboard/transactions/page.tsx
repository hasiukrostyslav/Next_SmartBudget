import { Suspense } from 'react';

import { getTransactions } from '@/lib/actions/transactionActions';
import { EMPTY_STATE_TEXT } from '@/lib/constants/messages';
import { SearchParamsSchema } from '@/lib/schemas/schema';

import TransactionsCTA from '@/components/ui/features/transactions/TransactionsCTA';
import TransactionsFilters from '@/components/ui/features/transactions/TransactionsFilters';
import TransactionsList from '@/components/ui/features/transactions/TransactionsList';
import EmptyState from '@/components/ui/feedback/EmptyState';
import Error from '@/components/ui/feedback/Error';
import Spinner from '@/components/ui/feedback/Spinner';
import PaginationTable from '@/components/ui/pagination/PaginationTable';

type SearchParamsType = { [key: string]: string | string[] | undefined };

async function TransactionsContent({
  parsedParams,
}: {
  parsedParams: ReturnType<typeof SearchParamsSchema.safeParse>['data'];
}) {
  const result = await getTransactions(parsedParams);

  if (!result.success || !result.data)
    return (
      <Error
        type={
          result.status === 401
            ? 'auth'
            : result.status === 404
              ? 'route'
              : 'server'
        }
      />
    );

  if (result.data.transactions.length < 1)
    return (
      <EmptyState config={EMPTY_STATE_TEXT.transactions}>
        <TransactionsCTA
          buttonSize="sm"
          iconSize={14}
          configCTA={EMPTY_STATE_TEXT.transactions.cta}
        />
      </EmptyState>
    );

  return (
    <>
      <TransactionsList data={result.data.transactions} />
      <PaginationTable totalCount={result.data.transactionCount} />
    </>
  );
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const params = SearchParamsSchema.safeParse(await searchParams);
  const suspenseKey = JSON.stringify(params.data);

  return (
    <section className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <TransactionsFilters />
      <Suspense
        key={suspenseKey}
        fallback={
          <Spinner
            title="Loading your transactions"
            subtitle="Fetching balances and recent activity..."
          />
        }
      >
        <TransactionsContent parsedParams={params.data} />
      </Suspense>
    </section>
  );
}
