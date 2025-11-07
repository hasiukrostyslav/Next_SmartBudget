import { navLinks } from '@/lib/constants/constants';
import NavLink from '../ui/NavLink';

interface NavbarProps {
  isCollapsed: boolean;
}

export default function Navbar({ isCollapsed }: NavbarProps) {
  return (
    <nav className="mt-4 flex flex-col gap-3">
      {navLinks
        .filter((el) => el.type === 'main')
        .map((el) => (
          <NavLink
            key={el.page}
            iconName={el.icon}
            href={
              el.page === 'dashboard' ? '/dashboard' : `/dashboard/${el.page}`
            }
            text={el.page.replace(el.page[0], el.page[0].toUpperCase())}
            isCollapsed={isCollapsed}
          />
        ))}

      <div className="flex flex-col gap-3 border-t-2 border-blue-400 pt-3">
        {navLinks
          .filter((el) => el.type === 'setting')
          .map((el) => (
            <NavLink
              key={el.page}
              iconName={el.icon}
              href={`/dashboard/${el.page}`}
              text={el.page.replace(el.page[0], el.page[0].toUpperCase())}
              isCollapsed={isCollapsed}
            />
          ))}
      </div>
    </nav>
  );
}
