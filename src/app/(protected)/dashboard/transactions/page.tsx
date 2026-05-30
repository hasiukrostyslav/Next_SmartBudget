import { getTransactions } from '@/lib/actions/transactionActions';
import { EMPTY_STATE_TEXT } from '@/lib/constants/messages';
import { SearchParamsSchema } from '@/lib/schemas/schema';

import EmptyState from '@/components/ui/EmptyState';
import Error from '@/components/ui/Error';
import PaginationTable from '@/components/ui/pagination/PaginationTable';
import TransactionsCTA from '@/components/ui/transactions/TransactionsCTA';
import TransactionsFilters from '@/components/ui/transactions/TransactionsFilters';
import TransactionsList from '@/components/ui/transactions/TransactionsList';

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = SearchParamsSchema.safeParse(await searchParams);

  const result = await getTransactions(params?.data);

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

  if (result.success && result?.data?.transactions?.length < 1)
    return (
      <EmptyState config={EMPTY_STATE_TEXT.transactions}>
        <TransactionsCTA
          buttonSize="sm"
          iconSize={14}
          configCTA={EMPTY_STATE_TEXT.transactions.cta}
        />
      </EmptyState>
    );
  else
    return (
      <section className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
        <TransactionsFilters />
        <TransactionsList data={result.data.transactions} />
        <PaginationTable totalCount={result.data.transactionCount} />
      </section>
    );
}
