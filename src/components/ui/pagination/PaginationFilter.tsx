import Select from '../selects/Select';

export default function PaginationFilter() {
  const numOfPages = ['10', '25', '50', '100'];
  return (
    <div className="flex items-center gap-2">
      <span>Showing</span>
      <Select
        name="page"
        data={numOfPages}
        width="sm"
        defaultValue={numOfPages[0]}
        contentPosition="top"
        color="blue"
      />
      <span>out of 100</span>
    </div>
  );
}
