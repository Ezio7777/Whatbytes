import Link from "next/link";
import { PackageX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft text-brand">
        <PackageX className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-navy-ink">
        Product not found
      </h1>
      <p className="mt-2 max-w-sm text-navy-ink/70">
        This product does not exist or may have been removed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand px-6 font-semibold text-white hover:bg-brand-dark"
      >
        Back to products
      </Link>
    </div>
  );
}
