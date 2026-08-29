import { Search, ChevronDown } from "lucide-react";
import type { ListingStatus, MySortKey } from "./data";

export type StatusFilter = "all" | ListingStatus;

const statusTabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "paused", label: "Paused" },
  { value: "sold", label: "Sold" },
];

const sortOptions: { value: MySortKey; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function MyListingsToolbar({
  search,
  status,
  sort,
  onSearch,
  onStatus,
  onSort,
}: {
  search: string;
  status: StatusFilter;
  sort: MySortKey;
  onSearch: (v: string) => void;
  onStatus: (v: StatusFilter) => void;
  onSort: (v: MySortKey) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative flex min-w-0 flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search your listings..."
            aria-label="Search your listings"
            className="h-11 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
          />
        </label>

        <div className="-mx-1 overflow-x-auto px-1 lg:mx-0 lg:overflow-visible lg:px-0">
          <div
            role="tablist"
            aria-label="Filter by status"
            className="inline-flex min-w-max gap-1 rounded-xl border border-border bg-secondary/60 p-1"
          >
            {statusTabs.map((t) => {
              const active = status === t.value;
              return (
                <button
                  key={t.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => onStatus(t.value)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-card text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <label className="relative inline-flex items-center">
          <select
            aria-label="Sort listings"
            value={sort}
            onChange={(e) => onSort(e.target.value as MySortKey)}
            className="h-11 w-full appearance-none rounded-xl border border-border bg-background pl-3.5 pr-9 text-sm font-medium outline-none transition-colors hover:bg-secondary focus:border-primary/40 focus:ring-2 focus:ring-ring/20 lg:w-52"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground" />
        </label>
      </div>
    </div>
  );
}
