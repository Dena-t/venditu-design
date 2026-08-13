import { conditions, categoryOptions, provinceOptions, type Condition } from "./data";
import type { ListingQuery } from "./types";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

const fieldCls =
  "h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary/40 focus:ring-2 focus:ring-ring/20";

export function ListingFilters({
  query,
  onChange,
  onReset,
}: {
  query: ListingQuery;
  onChange: (patch: Partial<ListingQuery>) => void;
  onReset: () => void;
}) {
  const toggleCondition = (c: Condition) =>
    onChange({
      conditions: query.conditions.includes(c)
        ? query.conditions.filter((x) => x !== c)
        : [...query.conditions, c],
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Filters</h2>
        <button
          onClick={onReset}
          className="text-xs font-medium text-primary transition-opacity hover:opacity-70"
        >
          Clear all
        </button>
      </div>

      <Group title="Category">
        <select
          value={query.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className={fieldCls}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categoryOptions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Group>

      <Group title="Location">
        <select
          value={query.province}
          onChange={(e) => onChange({ province: e.target.value })}
          className={fieldCls}
          aria-label="Filter by province"
        >
          <option value="">All provinces</option>
          {provinceOptions.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <input
          value={query.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="City"
          aria-label="Filter by city"
          className={`${fieldCls} mt-2.5`}
        />
      </Group>

      <Group title="Price">
        <div className="flex items-center gap-2">
          <input
            inputMode="numeric"
            value={query.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value.replace(/\D/g, "") })}
            placeholder="Min"
            aria-label="Minimum price"
            className={fieldCls}
          />
          <span className="text-muted-foreground">–</span>
          <input
            inputMode="numeric"
            value={query.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value.replace(/\D/g, "") })}
            placeholder="Max"
            aria-label="Maximum price"
            className={fieldCls}
          />
        </div>
      </Group>

      <Group title="Condition">
        <div className="flex flex-wrap gap-2">
          {conditions.map((c) => {
            const active = query.conditions.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggleCondition(c)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </Group>

      <Group title="Quantity">
        <select
          value={query.minQuantity}
          onChange={(e) => onChange({ minQuantity: e.target.value })}
          className={fieldCls}
          aria-label="Minimum quantity available"
        >
          <option value="">Any quantity</option>
          <option value="2">2+ available</option>
          <option value="5">5+ available</option>
          <option value="10">10+ available</option>
        </select>
      </Group>
    </div>
  );
}
