import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import '../globals.css';

const sourceSans = Source_Sans_3({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | SmartBudget',
    default: 'Welcome | SmartBudget',
  },
  description: 'Track all your finance in one app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${sourceSans.className}`}>{children}</body>
    </html>
  );
}
