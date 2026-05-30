import Spinner from '@/components/ui/feedback/Spinner';

export default function loading() {
  return (
    <Spinner
      title="Loading your transactions"
      subtitle="Fetching balances and recent activity..."
    />
  );
}
