import { cache, Suspense } from 'react';

import { TRANSACTIONS_PATH } from '@/routes';
import { getTransactions } from '@/lib/actions/transactionActions';
import { EMPTY_STATE_TEXT } from '@/lib/constants/messages';
import { TRANSACTION_FILTERS } from '@/lib/constants/navigation';
import { SearchParamsSchema } from '@/lib/schemas/transaction.schema';
import { hasActiveFilters } from '@/lib/utils/utils';

import TransactionsCTA from '@/components/ui/features/transactions/TransactionsCTA';
import TransactionsList from '@/components/ui/features/transactions/TransactionsList';
import TransactionsToolbar from '@/components/ui/features/transactions/TransactionsToolbar';
import EmptyState from '@/components/ui/feedback/EmptyState';
import Error from '@/components/ui/feedback/Error';
import LoadingOverlay from '@/components/ui/feedback/LoadingOverlay';
import PaginationTable from '@/components/ui/pagination/PaginationTable';

type SearchParamsType = { [key: string]: string | string[] | undefined };

type ParsedParams = ReturnType<typeof SearchParamsSchema.safeParse>['data'];

// The list and the pagination render in separate Suspense boundaries and both
// need the same page of data. cache() memoises per request by argument
// identity, and both receive the same parsedParams object, so the query (a
// findMany plus a count) runs once instead of twice.
const getTransactionsForRequest = cache(getTransactions);

async function TransactionsListContent({
  parsedParams,
}: {
  parsedParams: ParsedParams;
}) {
  const result = await getTransactionsForRequest(parsedParams);

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

  if (result.data.transactions.length < 1) {
    const isFilterApplied = hasActiveFilters(parsedParams, TRANSACTION_FILTERS);

    return (
      <EmptyState
        config={EMPTY_STATE_TEXT.transactions}
        isFilterApplied={isFilterApplied}
        clearFiltersHref={TRANSACTIONS_PATH}
      >
        <TransactionsCTA
          buttonSize="sm"
          iconSize={14}
          configCTA={EMPTY_STATE_TEXT.transactions.cta}
        />
      </EmptyState>
    );
  }

  return <TransactionsList data={result.data.transactions} />;
}

async function TransactionsPaginationContent({
  parsedParams,
}: {
  parsedParams: ParsedParams;
}) {
  const result = await getTransactionsForRequest(parsedParams);

  if (!result.success || !result.data) return null;

  return <PaginationTable totalCount={result.data.transactionCount} />;
}

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamsType>;
}) {
  const params = SearchParamsSchema.safeParse(await searchParams);
  const suspenseKey = JSON.stringify(params.data);

  return (
    <section className="grid h-full min-h-0 grid-rows-[auto_1fr_auto] gap-4">
      <Suspense fallback={null}>
        <TransactionsToolbar />
      </Suspense>
      <div className="relative min-h-0">
        <Suspense
          key={suspenseKey}
          fallback={
            <LoadingOverlay
              title="Loading your transactions"
              subtitle="Fetching balances and recent activity..."
            />
          }
        >
          <TransactionsListContent parsedParams={params.data} />
        </Suspense>
      </div>
      <Suspense key={`pagination-${suspenseKey}`} fallback={null}>
        <TransactionsPaginationContent parsedParams={params.data} />
      </Suspense>
    </section>
  );
}
