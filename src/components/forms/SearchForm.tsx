import Icon from '../ui/Icon';

export default function SearchForm() {
  return (
    <form
      className="relative ml-auto rounded-md bg-slate-200 dark:bg-slate-600"
      autoComplete="off"
    >
      <input
        name="search"
        type="text"
        placeholder="Search..."
        className="outline-input py-1 pr-10 pl-4 text-sm tracking-wider text-slate-700 placeholder:text-slate-500 dark:text-slate-100 dark:placeholder:text-slate-300"
      />
      <button
        type="submit"
        className="outline-round-sm absolute right-3 bottom-1.5"
      >
        <Icon
          className="text-slate-400 dark:text-slate-400"
          size={16}
          name="search"
        />
      </button>
    </form>
  );
}
