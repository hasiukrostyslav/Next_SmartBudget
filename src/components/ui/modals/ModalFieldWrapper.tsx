export default function ModalFieldWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full flex-col gap-1">{children}</div>;
}
