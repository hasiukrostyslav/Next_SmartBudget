// Fields sit side by side from the sm breakpoint and stack below it.
export default function ModalFieldRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {children}
    </div>
  );
}
