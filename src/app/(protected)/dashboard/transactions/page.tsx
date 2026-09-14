import { cache, Suspense } from 'react';

import { redirect } from 'next/navigation';

import { TRANSACTIONS_PATH } from '@/routes';
import { EMPTY_STATE_TEXT } from '@/lib/constants/messages';
import { TRANSACTION_FILTERS } from '@/lib/constants/navigation';
import { getTransactions } from '@/lib/data/transactions';
import { SearchParamsSchema } from '@/lib/schemas/transaction.schema';
import {
  normaliseSearchParams,
  RawSearchParams,
  toQueryString,
} from '@/lib/utils/searchParams';
import { hasActiveFilters } from '@/lib/utils/utils';

import TransactionsCTA from '@/components/ui/features/transactions/TransactionsCTA';
import TransactionsList from '@/components/ui/features/transactions/TransactionsList';
import TransactionsToolbar from '@/components/ui/features/transactions/TransactionsToolbar';
import EmptyState from '@/components/ui/feedback/EmptyState';
import Error from '@/components/ui/feedback/Error';
import LoadingOverlay from '@/components/ui/feedback/LoadingOverlay';
import PaginationTable from '@/components/ui/pagination/PaginationTable';

type ParsedParams = ReturnType<typeof SearchParamsSchema.parse>;

// The list and the pagination render in separate Suspense boundaries and both
// need the same page of data. cache() memoises per request by argument
// identity, and both receive the same parsedParams object, so the query (a
// findMany plus a count) runs once instead of twice.
const getTransactionsForRequest = cache(getTransactions);

async function TransactionsListContent({
  parsedParams,
  query,
}: {
  parsedParams: ParsedParams;
  query: string;
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

  const { transactions, transactionCount } = result.data;

  // A page past the end (the last rows on it were deleted, or the URL was
  // edited) would otherwise show "No transactions yet" while rows exist.
  const lastPage = Math.ceil(transactionCount / parsedParams.limit);
  if (transactions.length < 1 && lastPage > 0 && parsedParams.page > lastPage) {
    const target = new URLSearchParams(query);
    target.set('page', String(lastPage));
    target.sort();
    redirect(`${TRANSACTIONS_PATH}?${target}`);
  }

  if (transactions.length < 1) {
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

  return <TransactionsList data={transactions} />;
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
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const parsedParams = SearchParamsSchema.parse(raw);

  // An invalid limit, page, sort or order renders its fallback; make the
  // address bar agree, so pagination links and a shared URL reflect the page.
  const normalised = normaliseSearchParams(raw, parsedParams);
  if (normalised) redirect(`${TRANSACTIONS_PATH}?${normalised}`);

  const suspenseKey = JSON.stringify(parsedParams);

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
          <TransactionsListContent
            parsedParams={parsedParams}
            query={toQueryString(raw).toString()}
          />
        </Suspense>
      </div>
      <Suspense key={`pagination-${suspenseKey}`} fallback={null}>
        <TransactionsPaginationContent parsedParams={parsedParams} />
      </Suspense>
    </section>
  );
}
