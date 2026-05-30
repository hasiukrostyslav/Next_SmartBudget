export default function TransactionDate({ date }: { date: Date }) {
  const formattedDate = new Intl.DateTimeFormat('uk').format(date);
  const time = new Intl.DateTimeFormat('uk', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);

  return (
    <div className="flex flex-col px-1.5">
      <span className="font-medium">{formattedDate}</span>
      <span className="text-slate-500 dark:text-slate-500">{time}</span>
    </div>
  );
}
