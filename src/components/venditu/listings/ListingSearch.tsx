import { Search, MapPin, LayoutGrid } from "lucide-react";
import { categoryOptions } from "./data";
import type { ListingQuery } from "./types";

export function ListingSearch({
  query,
  onChange,
}: {
  query: ListingQuery;
  onChange: (patch: Partial<ListingQuery>) => void;
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-xs sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]"
    >
      <label className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          value={query.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Search listings, e.g. MacBook"
          aria-label="Search listings"
          className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
        />
      </label>

      <label className="relative flex items-center">
        <MapPin className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          value={query.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="Location"
          aria-label="Location"
          className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
        />
      </label>

      <label className="relative flex items-center">
        <LayoutGrid className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <select
          value={query.category}
          onChange={(e) => onChange({ category: e.target.value })}
          aria-label="Category"
          className="h-11 w-full appearance-none rounded-xl border border-border bg-background pl-9 pr-8 text-sm outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
        >
          <option value="">All categories</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="h-11 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Search
      </button>
    </form>
  );
}
