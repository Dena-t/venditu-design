import type { ListingStatus } from "./data";

const styles: Record<ListingStatus, { label: string; cls: string; dot: string }> = {
  active: {
    label: "Active",
    cls: "border-success/30 bg-success/10 text-success",
    dot: "bg-success",
  },
  draft: {
    label: "Draft",
    cls: "border-border bg-secondary text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  paused: {
    label: "Paused",
    cls: "border-accent/40 bg-accent/10 text-accent-foreground",
    dot: "bg-accent",
  },
  sold: {
    label: "Sold",
    cls: "border-primary/25 bg-primary/10 text-primary",
    dot: "bg-primary",
  },
};

export function StatusBadge({ status }: { status: ListingStatus }) {
  const s = styles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${s.cls}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
