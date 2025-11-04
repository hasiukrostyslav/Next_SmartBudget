import DashboardHeading from '../ui/DashboardHeading';
import SearchForm from '../forms/SearchForm';
import UserPanel from '../ui/UserPanel';
import Time from '../ui/Time';

export default function Header() {
  return (
    <header className="col-start-2 flex items-center px-6 py-3">
      <DashboardHeading />
      <Time />
      <SearchForm />
      <UserPanel />
    </header>
  );
}
