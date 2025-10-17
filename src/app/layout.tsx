import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import ThemeProvider from '@/context/ThemeContext';

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
