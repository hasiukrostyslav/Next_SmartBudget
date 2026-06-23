interface SpinnerProps {
  size: number;
}

export default function Spinner({ size }: SpinnerProps) {
  return (
    <div
      className="animate-spin rounded-full"
      style={{
        width: size,
        height: size,
        background: 'conic-gradient(from 0deg, transparent 0%, #3b82f6 100%)',
        WebkitMask:
          'radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))',
        mask: 'radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))',
      }}
    />
  );
}
