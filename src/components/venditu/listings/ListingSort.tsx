import { ChevronDown } from "lucide-react";
import type { SortKey } from "./types";

const options: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ListingSort({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <label className="relative inline-flex items-center">
      <span className="pointer-events-none absolute left-3 text-sm text-muted-foreground">Sort:</span>
      <select
        aria-label="Sort listings"
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="h-10 appearance-none rounded-xl border border-border bg-background pl-[3.25rem] pr-9 text-sm font-medium outline-none transition-colors hover:bg-secondary focus:border-primary/40 focus:ring-2 focus:ring-ring/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground" />
    </label>
  );
}
