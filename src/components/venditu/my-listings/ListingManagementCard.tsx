import { Pencil, Trash2, MapPin, Eye, Package, CalendarDays, Star } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ListingEditPanel } from "./ListingEditPanel";
import { formatDate, type MyListing } from "./data";

export function ListingManagementCard({
  listing,
  editing,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
}: {
  listing: MyListing;
  editing: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (patch: Partial<MyListing>) => void;
  onDelete: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-md">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-secondary sm:aspect-square sm:w-36 md:w-40">
          <img
            src={listing.images[0]}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {listing.isFeatured && (
            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-foreground/85 px-2 py-0.5 text-[10px] font-semibold text-background backdrop-blur">
              <Star className="h-2.5 w-2.5" /> Featured
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
            <div className="min-w-0">
              <a
                href={`/listing/${listing.id}`}
                className="block truncate text-base font-semibold text-foreground transition-colors hover:text-primary"
              >
                {listing.title}
              </a>
              <p className="mt-1 text-sm text-muted-foreground">
                {listing.category} · <MapPin className="inline h-3.5 w-3.5 -translate-y-px" />{" "}
                {listing.city}, {listing.province}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-primary">
                ${listing.price.toLocaleString()}
              </span>
              <StatusBadge status={listing.status} />
            </div>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" /> Created {formatDate(listing.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5" /> {listing.quantity} available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" /> {listing.views.toLocaleString()} views
            </span>
          </div>

          <div className="mt-4 flex gap-2.5 sm:mt-auto sm:justify-end sm:pt-4">
            <a
              href={`/listing/${listing.id}`}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary sm:flex-none"
            >
              <Eye className="h-4 w-4" /> View
            </a>
            <button
              onClick={editing ? onCancelEdit : onEdit}
              aria-expanded={editing}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary sm:flex-none"
            >
              <Pencil className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={onDelete}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-destructive/25 bg-background px-4 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 sm:flex-none"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>
      </div>

      <div
        className={`grid transition-all duration-300 ease-out ${
          editing ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {editing && (
            <ListingEditPanel listing={listing} onCancel={onCancelEdit} onSave={onSave} />
          )}
        </div>
      </div>
    </article>
  );
}
