import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '@/styles/globals.css';

import { ToastContainer } from 'react-toastify';

import { METADATA_TEXT } from '@/lib/constants/messages';
import ThemeProvider from '@/context/ThemeContext';

const roboto = Roboto({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: METADATA_TEXT.GLOBAL.template,
    default: METADATA_TEXT.GLOBAL.title,
  },
  description: METADATA_TEXT.GLOBAL.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <main className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-300">
          <ThemeProvider>
            <ToastContainer limit={1} />
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
