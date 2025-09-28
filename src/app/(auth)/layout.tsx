import Image from 'next/image';
import ThemeProvider from '@/_context/ThemeContext';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex h-screen w-screen'>
      <figure className='relative w-7/12'>
        <Image
          src='/background.jpg'
          alt='background image'
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 70vw, 100vw'
          quality={100}
          fill
          priority
        />
      </figure>
      <ThemeProvider>{children}</ThemeProvider>
    </section>
  );
}
