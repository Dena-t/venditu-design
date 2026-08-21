import { CalendarDays, Eye, ShieldCheck } from "lucide-react";

export interface ListingMetaData {
  owner: string;
  ownerInitials: string;
  ownerHandle: string;
  createdAt: string; // ISO
  views: number;
  verified?: boolean;
}

export function ListingMeta({ meta }: { meta: ListingMetaData }) {
  const created = new Date(meta.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-foreground">Listing information</h2>

      <div className="mt-4 flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-foreground">
          {meta.ownerInitials}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-foreground">{meta.owner}</span>
            {meta.verified && <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />}
          </div>
          <p className="truncate text-xs text-muted-foreground">{meta.ownerHandle}</p>
        </div>
      </div>

      <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="inline-flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" /> Created
          </dt>
          <dd className="font-medium text-foreground">{created}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="inline-flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4" /> Views
          </dt>
          <dd className="font-medium text-foreground">{meta.views.toLocaleString()} views</dd>
        </div>
      </dl>
    </section>
  );
}
