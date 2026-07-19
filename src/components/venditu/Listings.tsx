import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard, type Listing } from "./ProductCard";
import camera from "@/assets/listing-camera.jpg";
import chair from "@/assets/listing-chair.jpg";
import bike from "@/assets/listing-bike.jpg";
import laptop from "@/assets/listing-laptop.jpg";
import apartment from "@/assets/listing-apartment.jpg";
import watch from "@/assets/listing-watch.jpg";

const latest: Listing[] = [
  { id: "1", title: "Leica M-A Rangefinder Camera", price: "€2,450", image: camera, location: "Paris 3e, FR", postedAgo: "2h ago", rating: 4.9 },
  { id: "2", title: "Scandinavian Oak Armchair", price: "€320", image: chair, location: "Lyon, FR", postedAgo: "5h ago", rating: 4.8 },
  { id: "3", title: "VanMoof S5 Electric Bike", price: "€1,890", image: bike, location: "Bordeaux, FR", postedAgo: "1d ago", rating: 4.7 },
  { id: "4", title: "MacBook Pro 14\" M3 — Mint", price: "€1,650", image: laptop, location: "Marseille, FR", postedAgo: "3h ago", rating: 5.0 },
  { id: "5", title: "Omega Seamaster Deville", price: "€2,100", image: watch, location: "Nice, FR", postedAgo: "1d ago", rating: 4.9 },
  { id: "6", title: "Sunlit 2BR Apartment — Downtown", price: "€1,450/mo", image: apartment, location: "Toulouse, FR", postedAgo: "6h ago", rating: 4.8 },
];

const featured: Listing[] = [
  { id: "f1", title: "Loft 90m² · Balcony · Herringbone floors", price: "€1,450/mo", image: apartment, location: "Toulouse, FR", postedAgo: "Featured", rating: 4.9, featured: true },
  { id: "f2", title: "MacBook Pro 14\" M3 · AppleCare+", price: "€1,650", image: laptop, location: "Marseille, FR", postedAgo: "Featured", rating: 5.0, featured: true },
  { id: "f3", title: "VanMoof S5 · 500 km · Full warranty", price: "€1,890", image: bike, location: "Bordeaux, FR", postedAgo: "Featured", rating: 4.8, featured: true },
];

export function LatestListings() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <section id="listings" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Latest listings</h2>
          <p className="mt-2 text-sm text-muted-foreground">Fresh drops from sellers near you.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button onClick={() => scroll(-1)} aria-label="Scroll left" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-secondary">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scroll(1)} aria-label="Scroll right" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-secondary">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={ref} className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {latest.map((l) => (
          <div key={l.id} className="snap-start">
            <ProductCard listing={l} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeaturedListings() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured listings</h2>
          <p className="mt-2 text-sm text-muted-foreground">Hand-picked premium items from verified sellers.</p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((l) => (
          <ProductCard key={l.id} listing={l} size="lg" />
        ))}
      </div>
    </section>
  );
}
