export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  comment: (productName: string) => string;
  date: string;
}

const reviewPool: Review[] = [
  {
    id: "r1",
    name: "Aarav S.",
    rating: 5,
    title: "Exactly what I wanted",
    comment: (n) =>
      `Ordered the ${n} last month and it has been great so far. Quality feels solid and delivery was quick.`,
    date: "September 2026",
  },
  {
    id: "r2",
    name: "Meera K.",
    rating: 4,
    title: "Good value for the price",
    comment: (n) =>
      `The ${n} looks just like the photos. Small things could be better, but I would still recommend it.`,
    date: "August 2026",
  },
  {
    id: "r3",
    name: "Rohan P.",
    rating: 5,
    title: "Happy with this purchase",
    comment: (n) =>
      `Bought the ${n} as a gift and it was a hit. Packaging was neat and everything arrived on time.`,
    date: "August 2026",
  },
  {
    id: "r4",
    name: "Sneha D.",
    rating: 4,
    title: "Nice, does the job",
    comment: (n) =>
      `Using the ${n} daily now. Works well and feels well made. Would buy again.`,
    date: "July 2026",
  },
  {
    id: "r5",
    name: "Kabir M.",
    rating: 3,
    title: "Decent, not perfect",
    comment: (n) =>
      `The ${n} is okay for the price. It took a couple of days to get used to, but fine overall.`,
    date: "July 2026",
  },
];

/** sample reviews, rotated by product id so each product shows a different mix */
export function getReviews(productId: string, count = 3): Review[] {
  const offset = Number(productId) % reviewPool.length || 0;
  return Array.from({ length: count }, (_, i) => reviewPool[(offset + i) % reviewPool.length]);
}

/** rough star distribution (percent for 5,4,3,2,1 stars) based on the average */
export function getRatingBreakdown(rating: number) {
  const weights = [5, 4, 3, 2, 1].map((star) =>
    Math.exp(-Math.pow(star - rating, 2) / 1.1)
  );
  const total = weights.reduce((a, b) => a + b, 0);
  return [5, 4, 3, 2, 1].map((star, i) => ({
    star,
    percent: Math.round((weights[i] / total) * 100),
  }));
}
