"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
        <TriangleAlert className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-navy-ink">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-navy-ink/70">
        An unexpected error happened. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 h-11 rounded-lg bg-brand px-6 font-semibold text-white hover:bg-brand-dark"
      >
        Try again
      </button>
    </div>
  );
}
