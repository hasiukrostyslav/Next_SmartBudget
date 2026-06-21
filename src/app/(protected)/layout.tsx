import { TooltipProvider } from '@radix-ui/react-tooltip';

import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Sidebar from '@/components/layouts/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]">
      <TooltipProvider>
        <Sidebar />
        <Header />
        <section className="relative bg-slate-200 px-6 py-4 dark:bg-slate-900">
          {children}
        </section>
        <Footer />
      </TooltipProvider>
    </section>
  );
}
