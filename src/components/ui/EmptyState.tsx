import Image from 'next/image';
import clsx from 'clsx';
import Button from './buttons/Button';
import Icon from './Icon';

export default function EmptyState() {
  return (
    <section
      className={clsx(
        'row-span-full flex h-full flex-col items-center justify-center',
      )}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <Image
          className="h-[200] w-[200]"
          alt="Error"
          src="/error-404.png"
          width={200}
          height={200}
        />
        <h2
          className={clsx(
            'mt-4 text-2xl leading-snug font-bold tracking-wider',
          )}
        >
          Nothing here yet
        </h2>
      </div>
      <div className="mt-2 flex flex-col items-center justify-center gap-6">
        <p className="text-slate-500">Add your first transaction</p>
        <Button className="flex items-center gap-1.5" color="blue" size="md">
          <Icon name="plus" size={18} />
          <span>Create transaction</span>
        </Button>
      </div>
    </section>
  );
}
