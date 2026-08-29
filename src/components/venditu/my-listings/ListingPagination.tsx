import { ChevronLeft, ChevronRight } from "lucide-react";

function pages(total: number, current: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

const btn =
  "grid h-10 min-w-10 place-items-center rounded-xl border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40";

export function ListingPagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button className={btn} onClick={() => onChange(page - 1)} disabled={page === 1}>
        <span className="inline-flex items-center gap-1.5">
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </span>
      </button>

      {pages(totalPages, page).map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={
              p === page
                ? "grid h-10 min-w-10 place-items-center rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground"
                : btn
            }
          >
            {p}
          </button>
        ),
      )}

      <button className={btn} onClick={() => onChange(page + 1)} disabled={page === totalPages}>
        <span className="inline-flex items-center gap-1.5">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </span>
      </button>
    </nav>
  );
}
