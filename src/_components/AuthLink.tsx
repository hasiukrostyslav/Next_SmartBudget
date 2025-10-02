import Link from 'next/link';

interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AuthLink({ href, children, className }: AuthLinkProps) {
  return (
    <Link
      className={`outline-round-sm text-xs font-bold text-blue-600 underline hover:text-blue-500 ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
