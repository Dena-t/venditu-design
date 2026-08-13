import { SearchX } from "lucide-react";
import { ListingCard } from "./ListingCard";
import type { BrowseListing } from "./data";

export function ListingGrid({ listings }: { listings: BrowseListing[] }) {
  if (listings.length === 0) {
    return (
      <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
        <SearchX className="mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-semibold">No listings match your filters</p>
        <p className="mt-1 text-sm text-muted-foreground">Try widening your search or clearing filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {listings.map((l) => (
        <ListingCard key={l.id} listing={l} />
      ))}
    </div>
  );
}
