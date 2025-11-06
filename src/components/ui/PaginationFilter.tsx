export default function PaginationFilter() {
  return (
    <div className="flex gap-2">
      <span>Showing</span>
      <input type="number" />
      <span>out of 100</span>
    </div>
  );
}
