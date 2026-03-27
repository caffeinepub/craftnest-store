import { Star } from "lucide-react";

const STAR_KEYS = ["star-1", "star-2", "star-3", "star-4", "star-5"];

export default function StarRating({
  rating,
  max = 5,
}: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {STAR_KEYS.slice(0, max).map((key, i) => (
        <Star
          key={key}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-craftnest-peach text-craftnest-peach"
              : "fill-none text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}
