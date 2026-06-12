export function StarRating({
  rating,
  size = 'sm'
}: {
  rating: number;
  size?: 'sm' | 'md';
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const textSize = size === 'md' ? 'text-base' : 'text-sm';

  return (
    <span className={`inline-flex items-center ${textSize} text-amber-500`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && hasHalf) return <span key={i} className="opacity-60">★</span>;
        return (
          <span key={i} className="text-slate-300">
            ★
          </span>
        );
      })}
    </span>
  );
}
