import { cn } from "@/lib/utils";

export function ProductGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <ul
      aria-hidden
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="animate-pulse rounded-card bg-white p-3 shadow-card"
        >
          <div className="aspect-[4/3] rounded-lg bg-brand-soft" />
          <div className="mt-3 h-4 w-2/3 rounded bg-brand-soft" />
          <div className="mt-2 h-5 w-1/4 rounded bg-brand-soft" />
          <div className="mt-3 h-10 rounded-lg bg-brand-soft" />
        </li>
      ))}
    </ul>
  );
}
