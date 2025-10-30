import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="">
      <ul>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        <li>
          <Link href="#">Transactions</Link>
        </li>
        <li>
          <Link href="#">Payments</Link>
        </li>
        <li>
          <Link href="#">Cards</Link>
        </li>
        <li>
          <Link href="#">Savings</Link>
        </li>
        <li>
          <Link href="#">Loans</Link>
        </li>
        <li>
          <Link href="#">Deposits</Link>
        </li>
        <li>
          <Link href="#">Profile</Link>
        </li>
        <li>
          <Link href="#">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
