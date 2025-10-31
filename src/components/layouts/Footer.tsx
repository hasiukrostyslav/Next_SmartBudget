import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stale-100 col-start-3 -col-end-1 flex justify-center gap-20 border-t-2 border-blue-400 px-16 py-6">
      <p className="text-xs">Copyright &copy; 2025 SmartBudget</p>
      <ul className="flex gap-4 text-xs">
        <li className="hover:text-slate-500">
          <Link href="#">Privacy Policy</Link>
        </li>
        <li className="hover:text-slate-500">
          <Link href="#">Term and Condition</Link>
        </li>
        <li className="hover:text-slate-500">
          <Link href="#">Contact</Link>
        </li>
      </ul>
    </footer>
  );
}
