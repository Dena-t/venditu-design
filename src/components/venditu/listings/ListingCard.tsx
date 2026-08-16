import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Package, User } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { QuantityDisplay } from "./QuantityDisplay";
import { timeAgo, type BrowseListing } from "./data";

export function ListingCard({ listing }: { listing: BrowseListing }) {
  const [idx, setIdx] = useState(0);
  const multi = listing.images.length > 1;
  const go = (d: 1 | -1) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIdx((i) => (i + d + listing.images.length) % listing.images.length);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {listing.images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={listing.title}
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />

        <div className="absolute right-3 top-3">
          <FavoriteButton label={`Save ${listing.title}`} />
        </div>

        {listing.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background backdrop-blur">
            Featured
          </span>
        )}

        {multi && (
          <>
            <button
              onClick={go(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity duration-200 hover:bg-background group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={go(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-background/90 opacity-0 shadow-sm transition-opacity duration-200 hover:bg-background group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {listing.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === idx ? "w-4 bg-background" : "w-1.5 bg-background/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{listing.title}</h3>
          <div className="shrink-0 text-sm font-bold text-primary">
            {listing.currency}
            {listing.price.toLocaleString()}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-border bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
            {listing.condition}
          </span>
          <QuantityDisplay quantity={listing.quantity} />
        </div>

        <div className="mt-1 space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {listing.city}, {listing.province}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <User className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{listing.seller}</span>
            </span>
            <span className="shrink-0">{timeAgo(listing.postedAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

