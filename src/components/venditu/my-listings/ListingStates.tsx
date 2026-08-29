import { PackageOpen, SearchX, Plus } from "lucide-react";

export function ListingEmptyState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-muted-foreground">
        <PackageOpen className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold">You don't have any listings yet</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Create your first listing and start selling.
      </p>
      <a
        href="/create-listing"
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        <Plus className="h-4 w-4" /> Create Listing
      </a>
    </div>
  );
}

export function ListingNoResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card px-6 py-20 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-muted-foreground">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold">No listings found</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">Try changing your search or filters.</p>
      <button
        onClick={onClear}
        className="mt-6 h-11 rounded-xl border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        Clear filters
      </button>
    </div>
  );
}

export function ListingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            <div className="aspect-[4/3] w-full shrink-0 animate-pulse rounded-xl bg-secondary sm:aspect-square sm:w-36 md:w-40" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 w-1/2 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-secondary" />
              <div className="h-3 w-full animate-pulse rounded bg-secondary" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-secondary" />
              <div className="flex gap-2.5 pt-3">
                <div className="h-10 w-28 animate-pulse rounded-xl bg-secondary" />
                <div className="h-10 w-28 animate-pulse rounded-xl bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
