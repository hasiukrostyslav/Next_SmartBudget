import NavLink from '../ui/NavLink';

export default function Navbar() {
  return (
    <nav className="mt-4 flex flex-col gap-3">
      <NavLink iconName="layout-grid" href="/dashboard" text="Dashboard" />
      <NavLink
        iconName="arrow-left-right"
        href="/dashboard/transactions"
        text="Transactions"
      />
      <NavLink
        iconName="credit-card"
        href="/dashboard/payments"
        text="Payments"
      />
      <NavLink iconName="wallet-cards" href="/dashboard/cards" text="Cards" />
      <NavLink iconName="piggy-bank" href="/dashboard/savings" text="Savings" />
      <NavLink iconName="percent" href="/dashboard/loans" text="Loans" />
      <NavLink
        iconName="banknote-arrow-up"
        href="/dashboard/deposits"
        text="Deposits"
      />
      <div className="flex flex-col gap-3 border-t-2 border-blue-400 pt-3">
        <NavLink iconName="user" href="/dashboard/profile" text="Profile" />
        <NavLink
          iconName="settings"
          href="/dashboard/settings"
          text="Settings"
        />
      </div>
    </nav>
  );
}
