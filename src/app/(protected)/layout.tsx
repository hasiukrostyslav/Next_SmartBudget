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
      <Sidebar />
      <Header />
      <section className="mx-5 rounded-2xl border-2 border-slate-300 p-4 dark:border-slate-600">
        {children}
      </section>
      <Footer />
    </section>
  );
}
