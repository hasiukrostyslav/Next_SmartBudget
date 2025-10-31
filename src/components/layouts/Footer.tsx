import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stale-100 col-start-3 -col-end-1 flex justify-center gap-20 px-16 py-4">
      <p className="text-xs text-slate-500">
        Copyright &copy; 2025 SmartBudget
      </p>
      <ul className="flex gap-4 text-xs">
        <li className="text-slate-500 hover:text-slate-600">
          <Link className="outline-round-sm" href="#">
            Privacy Policy
          </Link>
        </li>
        <li className="text-slate-500 hover:text-slate-600">
          <Link className="outline-round-sm" href="#">
            Term and Condition
          </Link>
        </li>
        <li className="text-slate-500 hover:text-slate-600">
          <Link className="outline-round-sm" href="#">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
}
