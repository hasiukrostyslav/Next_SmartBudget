import Logo from '../ui/Logo';
import ThemeButton from '../ui/ThemeButton';
import Navbar from './Navbar';

export default function Sidebar() {
  return (
    <aside className="col-start-1 col-end-3 row-span-full bg-amber-400">
      <Logo />
      <Navbar />
      <ThemeButton />
    </aside>
  );
}
