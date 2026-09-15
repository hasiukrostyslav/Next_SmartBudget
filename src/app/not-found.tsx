import { Metadata } from 'next';
import Link from 'next/link';

import { METADATA_TEXT } from '@/lib/constants/messages';

import ThemeButton from '@/components/ui/buttons/ThemeButton';
import ErrorState from '@/components/ui/feedback/ErrorState';
import Logo from '@/components/ui/logos/Logo';

export const metadata: Metadata = {
  title: METADATA_TEXT.NOT_FOUND_PAGE,
};

export default function NotFound() {
  return (
    <section className="relative flex h-dvh items-center justify-center">
      <Link href="/">
        <Logo className="absolute top-2.5 left-6.5 h-10" type="lg" />
      </Link>
      <ErrorState type="route" page="outer" />
      <ThemeButton className="absolute right-10 bottom-5" />
    </section>
  );
}
