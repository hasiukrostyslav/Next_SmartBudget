import { EMPTY_STATE_TEXT } from '@/lib/constants/messages';

import TransactionsCTA from '@/components/ui/features/transactions/TransactionsCTA';
import EmptyState from '@/components/ui/feedback/EmptyState';

export default async function page() {
  return (
    <EmptyState config={EMPTY_STATE_TEXT.dashboard}>
      <TransactionsCTA
        buttonSize="sm"
        iconSize={14}
        configCTA={EMPTY_STATE_TEXT.dashboard.cta}
      />
    </EmptyState>
  );
}
