'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import clsx from 'clsx';

import { ERROR_MESSAGES_CONFIG } from '@/lib/constants/ui';

import Button from './buttons/Button';
import ButtonLink from './buttons/ButtonLink';
import Icon from './Icon';

interface ErrorProps {
  type: keyof typeof ERROR_MESSAGES_CONFIG;
  page?: 'inner' | 'outer';
}

export default function Error({ type, page = 'inner' }: ErrorProps) {
  const router = useRouter();

  return (
    <figure
      className={clsx(
        'flex flex-col items-center justify-center gap-8',
        `${page === 'inner' ? 'mt-12' : ''}`,
      )}
    >
      <Image
        className="h-[300] w-[300]"
        alt="Error"
        src={`/error-${ERROR_MESSAGES_CONFIG[type].code}.png`}
        width={300}
        height={300}
        loading="eager"
      />
      <figcaption className="mt-4 text-center">
        <h2 className="text-3xl leading-snug font-bold tracking-wider">
          {ERROR_MESSAGES_CONFIG[type].header}
        </h2>
        <p className="mt-3 leading-snug font-light">
          {ERROR_MESSAGES_CONFIG[type].message}
        </p>
      </figcaption>
      {page === 'outer' && (
        <div className="flex gap-4">
          <ButtonLink iconName="utility" color="blue" href="/">
            Back to Home
          </ButtonLink>
          <Button size="lg" color="outline" onClick={() => router.back()}>
            <Icon name="arrow-left" size={18} />
            Go Back
          </Button>
        </div>
      )}
    </figure>
  );
}
