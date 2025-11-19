import PaginationFilter from './PaginationFilter';
import Pagination from './Pagination';

export default function PaginationTable() {
  return (
    <section className="flex items-center justify-between px-1 py-1">
      <PaginationFilter />
      <Pagination />
    </section>
  );
}
