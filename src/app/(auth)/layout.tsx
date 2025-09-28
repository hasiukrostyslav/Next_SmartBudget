import type { Metadata } from 'next';
import Image from 'next/image';
import { Roboto } from 'next/font/google';
import '../globals.css';
import ThemeProvider from '@/_context/ThemeContext';

const roboto = Roboto({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | SmartBudget',
    default: 'Welcome | SmartBudget',
  },
  description: 'Smart Money, Bright Tomorrow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.className}`}>
        <main className='flex h-screen w-screen text-slate-900 dark:text-slate-300 dark:bg-slate-900'>
          <div className='relative w-7/12'>
            <Image
              src='/background.jpg'
              alt='background image'
              sizes='(max-width: 768px) 50vw, (max-width: 1200px) 70vw, 100vw'
              quality={100}
              fill
              priority
            />
          </div>
          <ThemeProvider>{children}</ThemeProvider>
        </main>
      </body>
    </html>
  );
}
