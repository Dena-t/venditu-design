import { Heart, MapPin, Star, Clock } from "lucide-react";
import { useState } from "react";

export interface Listing {
  id: string;
  title: string;
  price: string;
  image: string;
  location: string;
  postedAgo: string;
  rating: number;
  featured?: boolean;
  category?: string;
}

export function ProductCard({ listing, size = "md" }: { listing: Listing; size?: "md" | "lg" }) {
  const [fav, setFav] = useState(false);
  const isLg = size === "lg";
  return (
    <article
      className={`group flex shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg ${
        isLg ? "w-full" : "w-[260px] sm:w-[280px]"
      }`}
    >
      <div className={`relative overflow-hidden bg-secondary ${isLg ? "aspect-[4/3]" : "aspect-square"}`}>
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => { e.preventDefault(); setFav((v) => !v); }}
          aria-label="Save to favorites"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/95 shadow-sm backdrop-blur transition-transform hover:scale-105"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${fav ? "fill-destructive text-destructive" : "text-foreground"}`}
            strokeWidth={2}
          />
        </button>
        {listing.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background backdrop-blur">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{listing.title}</h3>
          <div className="shrink-0 text-sm font-bold text-primary">{listing.price}</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> <span className="truncate">{listing.location}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {listing.postedAgo}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
            <span className="font-medium text-foreground">{listing.rating.toFixed(1)}</span>
          </span>

        </div>
      </div>
    </article>
  );
}
