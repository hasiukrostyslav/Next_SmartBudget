import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Sidebar from '@/components/layouts/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto]">
      <Sidebar />
      <Header />
      <section className="relative min-h-0 overflow-y-auto bg-slate-50 px-6 py-4 dark:bg-slate-900">
        {children}
      </section>
      <Footer />
    </section>
  );
}
