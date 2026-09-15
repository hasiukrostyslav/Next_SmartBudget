import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-dvh w-full">
      {/* The image column is decoration; below lg the form takes the screen. */}
      <figure className="relative hidden lg:block lg:w-7/12">
        <Image
          src="/background.jpg"
          alt=""
          // 7/12 of the viewport from lg, hidden below it: a phone asks for the
          // smallest candidate instead of a full-width hero.
          sizes="(min-width: 1024px) 59vw, 1px"
          fill
          priority
        />
      </figure>
      {children}
    </section>
  );
}
