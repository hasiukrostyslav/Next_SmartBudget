import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import Sidebar from '@/components/layouts/Sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="grid h-screen grid-cols-[210px_1fr] grid-rows-[auto_1fr_auto]">
      <Sidebar />
      <Header />
      {children}
      <Footer />
    </section>
  );
}
