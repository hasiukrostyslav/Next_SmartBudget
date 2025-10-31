import Link from 'next/link';
import Logo from '../ui/Logo';
import Navbar from './Navbar';
import ThemeButton from '../ui/ThemeButton';

export default function Sidebar() {
  return (
    <aside className="relative col-start-1 col-end-2 row-span-full flex flex-col border-r-2 border-blue-400 bg-slate-100 px-4 py-2.5 transition-all duration-500 dark:bg-slate-800">
      <Link className="outline-round-md" href="/">
        <Logo className="w-42" type="lg" />
        {/* <Logo className="w-16" type="sm" /> */}
      </Link>
      <Navbar />
      <ThemeButton className="mt-auto self-center justify-self-center" />

      {/* <button className="outline-round-sm absolute -right-9 bottom-2.5 rounded-r-lg border-2 border-l-0 border-blue-400 p-2 text-blue-400 hover:text-blue-500 dark:text-blue-200">
        <Icon name="chevrons-left" size={18} />
      </button> */}
    </aside>
  );
}
