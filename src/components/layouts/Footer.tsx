import clsx from 'clsx';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className={clsx(
        'col-start-2 flex justify-center gap-20 px-16 py-4 text-xs',
        'text-slate-500 dark:text-slate-400',
      )}
    >
      <p>Copyright &copy; 2025 SmartBudget</p>
      <ul className="flex gap-4">
        <li className="hover:text-slate-600">
          <Link className="outline-round-sm" href="#">
            Privacy Policy
          </Link>
        </li>
        <li className="hover:text-slate-600">
          <Link className="outline-round-sm" href="#">
            Term and Condition
          </Link>
        </li>
        <li className="hover:text-slate-600">
          <Link className="outline-round-sm" href="#">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
}
