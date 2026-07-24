import SectionWrapper from '@/components/layouts/SectionWrapper';

import TransactionsCTA from './TransactionsCTA';

export default async function TransactionsToolbar() {
  return (
    <SectionWrapper>
      <div className="flex items-center gap-4">
        <div className="ml-auto flex items-center gap-4">
          <TransactionsCTA buttonSize="sm" iconSize={16} />
        </div>
      </div>
    </SectionWrapper>
  );
}
