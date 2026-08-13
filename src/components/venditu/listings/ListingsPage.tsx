import { useMemo, useState } from "react";
import { SlidersHorizontal, X, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/venditu/Navbar";
import { Footer } from "@/components/venditu/Footer";
import { ListingSearch } from "./ListingSearch";
import { ListingFilters } from "./ListingFilters";
import { ListingSort } from "./ListingSort";
import { ListingGrid } from "./ListingGrid";
import { browseListings } from "./data";
import { defaultQuery, type ListingQuery } from "./types";

const PAGE_SIZE = 8;

function initialQuery(): ListingQuery {
  if (typeof window === "undefined") return defaultQuery;
  const p = new URLSearchParams(window.location.search);
  return {
    ...defaultQuery,
    search: p.get("search") ?? "",
    city: p.get("city") ?? "",
    category: p.get("category") ?? "",
  };
}

export function ListingsPage() {
  const [query, setQuery] = useState<ListingQuery>(initialQuery);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [drawer, setDrawer] = useState(false);

  const patch = (p: Partial<ListingQuery>) => {
    setQuery((q) => ({ ...q, ...p }));
    setVisible(PAGE_SIZE);
  };

  const results = useMemo(() => {
    const s = query.search.trim().toLowerCase();
    const city = query.city.trim().toLowerCase();
    const min = query.minPrice ? Number(query.minPrice) : undefined;
    const max = query.maxPrice ? Number(query.maxPrice) : undefined;
    const minQty = query.minQuantity ? Number(query.minQuantity) : undefined;

    const filtered = browseListings.filter((l) => {
      if (s && !`${l.title} ${l.category} ${l.seller}`.toLowerCase().includes(s)) return false;
      if (city && !`${l.city} ${l.province}`.toLowerCase().includes(city)) return false;
      if (query.category && l.category !== query.category) return false;
      if (query.province && l.province !== query.province) return false;
      if (min !== undefined && l.price < min) return false;
      if (max !== undefined && l.price > max) return false;
      if (query.conditions.length && !query.conditions.includes(l.condition)) return false;
      if (minQty !== undefined && l.quantity < minQty) return false;
      return true;
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (query.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "oldest":
          return +new Date(a.postedAt) - +new Date(b.postedAt);
        default:
          return +new Date(b.postedAt) - +new Date(a.postedAt);
      }
    });
    return sorted;
  }, [query]);

  const shown = results.slice(0, visible);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <a href="/" className="transition-colors hover:text-foreground">
            Home
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">Browse Listings</span>
        </nav>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Browse Listings</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Search, filter and compare every listing on Venditu.
        </p>

        <div className="mt-6">
          <ListingSearch query={query} onChange={patch} />
        </div>

        <div className="mt-8 flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
              <ListingFilters query={query} onChange={patch} onReset={() => setQuery(defaultQuery)} />
            </div>
          </aside>

          <section className="min-w-0 flex-1">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDrawer(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-secondary lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{results.length}</span> listings
                </p>
              </div>
              <ListingSort value={query.sort} onChange={(sort) => patch({ sort })} />
            </div>

            <ListingGrid listings={shown} />

            {visible < results.length && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="h-11 rounded-xl border border-border bg-background px-8 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  Load more listings
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
            onClick={() => setDrawer(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-card p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold">Filters</h2>
              <button
                onClick={() => setDrawer(false)}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ListingFilters query={query} onChange={patch} onReset={() => setQuery(defaultQuery)} />
            <button
              onClick={() => setDrawer(false)}
              className="mt-6 h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Show {results.length} listings
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
