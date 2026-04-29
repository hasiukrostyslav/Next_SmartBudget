import { Metadata } from 'next';
import Link from 'next/link';
import Error from '@/components/ui/Error';
import Logo from '@/components/ui/Logo';
import ThemeButton from '@/components/ui/buttons/ThemeButton';

export const metadata: Metadata = {
  title: 'Page not Found',
};

export default function NotFound() {
  return (
    <section className="relative flex h-screen items-center justify-center">
      <Link href="/">
        <Logo className="absolute top-2.5 left-6.5 h-10" type="lg" />
      </Link>
      <Error type="route" />
      <ThemeButton className="absolute right-10 bottom-5" />
    </section>
  );
}
