import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarsProps {
  rating: number;
  size?: number;
  className?: string;
}

export function Stars({ rating, size = 16, className }: StarsProps) {
  const percent = Math.max(0, Math.min(5, rating)) * 20;
  const row = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        width={size}
        height={size}
        className="shrink-0 fill-current"
        aria-hidden
      />
    ));

  return (
    <span
      className={cn("relative inline-flex", className)}
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      <span className="flex text-navy-ink/20">{row()}</span>
      <span
        className="absolute inset-y-0 left-0 flex overflow-hidden text-[#3F5F99]"
        style={{ width: `${percent}%` }}
      >
        {row()}
      </span>
    </span>
  );
}
