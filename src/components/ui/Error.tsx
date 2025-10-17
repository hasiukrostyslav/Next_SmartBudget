import Image from 'next/image';
import ButtonLink from './ButtonLink';

const errors = {
  auth: {
    code: 401,
    header: 'Unauthorize, please sign in!',
  },
  route: {
    code: 404,
    header: "Sorry, we didn't find any match!",
  },
  server: {
    code: 500,
    header: 'Internal server error',
  },
};

interface ErrorProps {
  type: keyof typeof errors;
}

export default function Error({ type }: ErrorProps) {
  return (
    <figure className="flex flex-col items-center justify-center gap-6">
      <Image
        className="h-[250] w-auto"
        alt="Error"
        src={`/error-${errors[type].code}.png`}
        width={250}
        height={250}
      />
      <figcaption className="mt-4 text-2xl font-bold">
        {errors[type].header}
      </figcaption>
      <ButtonLink href="#">Return Home</ButtonLink>
    </figure>
  );
}
