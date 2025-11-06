import Image from 'next/image';
import Button from './Button';
import clsx from 'clsx';
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
          className={clsx('mt-4 text-lg leading-snug font-bold tracking-wider')}
        >
          Nothing here yet
        </h2>
      </div>
      <div className="mt-2 flex flex-col items-center justify-center gap-3">
        <p className="text-slate-500">Add your first transaction</p>
        <Button className="flex items-center gap-0.5" color="blue" size="md">
          <Icon name="plus" size={20} />
          <span>Create</span>
        </Button>
      </div>
    </section>
  );
}
