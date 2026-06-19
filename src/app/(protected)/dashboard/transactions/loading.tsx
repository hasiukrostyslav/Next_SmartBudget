import LoadingOverlay from '@/components/ui/feedback/LoadingOverlay';

export default function loading() {
  return (
    <LoadingOverlay
      title="Loading your transactions"
      subtitle="Fetching balances and recent activity..."
    />
  );
}
