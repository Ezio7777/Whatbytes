import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Go to home page"
      className="text-2xl font-bold tracking-tight text-white sm:text-[32px] sm:leading-none"
    >
      Logo
    </Link>
  );
}
