import Image from 'next/image';
import ButtonLink from './ButtonLink';

const errors = {
  auth: {
    code: 401,
    header: 'Unauthorize, please sign in!',
  },
  route: {
    code: 404,
    header: 'Page not found',
  },
  server: {
    code: 500,
    header: 'Internal server error',
  },
};

interface ErrorProps {
  type: 'auth' | 'route' | 'server';
}

export default function Error({ type }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Image
        className="h-[300] w-auto"
        alt="Error"
        src={`/error-${errors[type].code}.png`}
        width={300}
        height={300}
      />
      <p className="mt-4 text-3xl font-bold">{errors[type].header}</p>
      <ButtonLink href="#">Return Home</ButtonLink>
    </div>
  );
}
