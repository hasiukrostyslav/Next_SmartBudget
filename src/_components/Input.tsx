interface InputProps {
  name: string;
  label?: string;
  error?: string;
}

export default function Input({ name, label, error }: InputProps) {
  return (
    <div className='flex flex-col gap-2 mb-2'>
      <label className='text-sm flex justify-between items-end' htmlFor={name}>
        {label}
        <span className='text-xs text-red-500'>{error}</span>
      </label>
      <input
        type='text'
        name={name}
        className={`outline-round-md px-3 py-2 border-2  ${
          error ? 'border-red-500' : 'border-slate-300'
        }`}
      />
    </div>
  );
}
