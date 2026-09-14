import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '@/styles/globals.css';

import { ToastContainer } from 'react-toastify';

import { METADATA_TEXT } from '@/lib/constants/messages';
import { THEME_INIT_SCRIPT } from '@/lib/constants/theme';
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
    // suppressHydrationWarning: THEME_INIT_SCRIPT adds the `dark` class to
    // <html> before React hydrates, so the attribute legitimately differs.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${roboto.className}`}>
        <main className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-300">
          <ThemeProvider>
            <ToastContainer
              limit={3}
              closeButton={false}
              hideProgressBar
              toastStyle={{
                background: 'transparent',
                boxShadow: 'none',
                padding: 0,
                minHeight: 'unset',
                overflow: 'visible',
              }}
            />
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
