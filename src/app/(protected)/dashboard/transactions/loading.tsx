import LoadingOverlay from '@/components/ui/feedback/LoadingOverlay';

export default function Loading() {
  return (
    <LoadingOverlay
      title="Loading your transactions"
      subtitle="Fetching balances and recent activity..."
    />
  );
}
