import PaginationButton from './PaginationButton';

export default function PaginationPage() {
  return (
    <div className="flex items-center gap-2">
      <PaginationButton href="#" page="prev" disable />
      <PaginationButton href="#" page={1} />
      <span className="flex h-7 w-7 justify-center p-1">...</span>
      {/* <PaginationButton href="#" page={2} /> */}
      <PaginationButton href="#" page={3} />
      <PaginationButton href="#" page={4} />
      <PaginationButton href="#" page={5} active />
      <PaginationButton href="#" page={5} />
      <span className="flex h-7 w-7 justify-center p-1">...</span>
      <PaginationButton href="#" page={10} />
      <PaginationButton href="#" page="next" />
    </div>
  );
}
