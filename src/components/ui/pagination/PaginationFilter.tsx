import Select from '../selects/Select';

export default function PaginationFilter() {
  return (
    <div className="flex items-center gap-2">
      <span>Showing</span>
      <Select
        name="page"
        heading="10"
        data={['25', '50', '100']}
        width="sm"
        contentPosition="top"
        color="blue"
      />
      <span>out of 100</span>
    </div>
  );
}
