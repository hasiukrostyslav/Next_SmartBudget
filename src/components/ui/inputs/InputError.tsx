interface InputErrorProps {
  id: string;
  message: string | undefined;
}

// Linked from its input by aria-describedby, and announced when it appears.
export default function InputError({ id, message }: InputErrorProps) {
  return (
    <span
      id={id}
      role="alert"
      className="absolute -bottom-5 text-xs tracking-wide text-red-500"
    >
      {message}
    </span>
  );
}
