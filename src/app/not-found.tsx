import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <p className="text-7xl font-extrabold tracking-tight text-brand sm:text-8xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-navy-ink">
        This page could not be found
      </h1>
      <p className="mt-2 max-w-sm text-navy-ink/70">
        The link may be broken or the page may have moved. Let us get you back
        to the products.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex h-12 items-center rounded-lg bg-brand px-8 text-lg font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Go to home
      </Link>
    </div>
  );
}
