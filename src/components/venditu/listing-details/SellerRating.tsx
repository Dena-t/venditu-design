import { Star } from "lucide-react";

/**
 * TEMPORARY frontend-only rating.
 * The seller rating system does not exist in the backend yet — replace the
 * body of this component with real data once the API provides it.
 */
export function SellerRating({ seller }: { seller: string }) {
  const placeholder = 4 + ((seller.length % 10) / 10) * 0.9;
  const rounded = Math.round(placeholder * 10) / 10;

  return (
    <span className="inline-flex items-center gap-1" title="Ratings coming soon">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < Math.round(rounded) ? "fill-foreground text-foreground" : "text-muted-foreground/40"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rounded.toFixed(1)}</span>
    </span>
  );
}
