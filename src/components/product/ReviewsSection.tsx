import type { Product } from "@/types/product";
import { getRatingBreakdown, getReviews } from "@/data/reviews";
import { Stars } from "@/components/ui/Stars";

export function ReviewsSection({ product }: { product: Product }) {
  const reviews = getReviews(product.id);
  const breakdown = getRatingBreakdown(product.rating);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="mt-8 scroll-mt-28 rounded-card bg-white p-4 shadow-card md:p-6 lg:p-8"
    >
      <h2 id="reviews-title" className="text-2xl font-bold text-navy-ink">
        Customer Reviews
      </h2>

      <div className="mt-5 grid gap-8 md:grid-cols-[260px_1fr]">
        <div>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold text-navy-ink">
              {product.rating.toFixed(1)}
            </span>
            <span className="pb-1.5 text-sm text-navy-ink/60">out of 5</span>
          </div>
          <Stars rating={product.rating} size={20} className="mt-2" />
          <p className="mt-1 text-sm text-navy-ink/60">
            {product.reviewCount} ratings
          </p>

          <ul className="mt-4 space-y-2">
            {breakdown.map(({ star, percent }) => (
              <li key={star} className="flex items-center gap-3 text-sm">
                <span className="w-10 text-navy-ink/70">{star} star</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-brand-soft">
                  <span
                    className="block h-full rounded-full bg-brand"
                    style={{ width: `${percent}%` }}
                  />
                </span>
                <span className="w-9 text-right text-navy-ink/60">
                  {percent}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="divide-y divide-brand/10">
          {reviews.map((review) => (
            <li key={review.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white"
                >
                  {review.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-ink">
                    {review.name}
                  </p>
                  <p className="text-xs text-navy-ink/60">{review.date}</p>
                </div>
              </div>
              <Stars rating={review.rating} size={14} className="mt-3" />
              <h3 className="mt-1.5 font-semibold text-navy-ink">
                {review.title}
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-navy-ink/80">
                {review.comment(product.title.toLowerCase())}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
