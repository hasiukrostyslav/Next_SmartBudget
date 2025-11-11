interface InputLabelProps {
  label: string;
  htmlFor: string;
}

export default function InputLabel({ label, htmlFor }: InputLabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm tracking-wider">
      {label}
    </label>
  );
}
