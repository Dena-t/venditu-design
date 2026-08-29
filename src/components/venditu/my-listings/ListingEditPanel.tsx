import { useState } from "react";
import { ImagePlus, X, Star } from "lucide-react";
import { Field, TextInput, TextArea, Select } from "@/components/venditu/create-listing/fields";
import {
  categoryOptions,
  conditionOptions,
  provinceOptions,
  statusOptions,
  type ListingStatus,
  type MyListing,
} from "./data";

export function ListingEditPanel({
  listing,
  onCancel,
  onSave,
}: {
  listing: MyListing;
  onCancel: () => void;
  onSave: (patch: Partial<MyListing>) => void;
}) {
  const [draft, setDraft] = useState<MyListing>(listing);
  const set = <K extends keyof MyListing>(k: K, v: MyListing[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div className="border-t border-border bg-secondary/30 p-4 sm:p-6">
      <h4 className="text-sm font-semibold">Edit listing</h4>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Title" htmlFor={`t-${listing.id}`} className="sm:col-span-2">
          <TextInput
            id={`t-${listing.id}`}
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
          />
        </Field>

        <Field label="Price ($)" htmlFor={`p-${listing.id}`}>
          <TextInput
            id={`p-${listing.id}`}
            inputMode="numeric"
            value={String(draft.price)}
            onChange={(e) => set("price", Number(e.target.value.replace(/\D/g, "")) || 0)}
          />
        </Field>

        <Field label="Quantity" htmlFor={`q-${listing.id}`}>
          <TextInput
            id={`q-${listing.id}`}
            inputMode="numeric"
            value={String(draft.quantity)}
            onChange={(e) => set("quantity", Number(e.target.value.replace(/\D/g, "")) || 0)}
          />
        </Field>

        <Field label="Condition">
          <Select
            options={conditionOptions}
            value={draft.condition}
            onChange={(e) => set("condition", e.target.value)}
          />
        </Field>

        <Field label="Status">
          <Select
            options={statusOptions.map((s) => s[0].toUpperCase() + s.slice(1))}
            value={draft.status[0].toUpperCase() + draft.status.slice(1)}
            onChange={(e) => set("status", e.target.value.toLowerCase() as ListingStatus)}
          />
        </Field>

        <Field label="Category">
          <Select
            options={categoryOptions}
            value={draft.category}
            onChange={(e) => set("category", e.target.value)}
          />
        </Field>

        <Field label="Province">
          <Select
            options={provinceOptions}
            value={draft.province}
            onChange={(e) => set("province", e.target.value)}
          />
        </Field>

        <Field label="City" htmlFor={`c-${listing.id}`}>
          <TextInput
            id={`c-${listing.id}`}
            value={draft.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </Field>

        <Field label="Description" htmlFor={`d-${listing.id}`} className="sm:col-span-2">
          <TextArea
            id={`d-${listing.id}`}
            rows={4}
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium">Photos</p>
        <div className="mt-2.5 flex flex-wrap gap-3">
          {draft.images.map((src, i) => (
            <div
              key={src + i}
              className="group relative h-20 w-20 overflow-hidden rounded-xl border border-border bg-secondary sm:h-24 sm:w-24"
            >
              <img src={src} alt={`${draft.title} photo ${i + 1}`} className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute bottom-1 left-1 rounded-full bg-foreground/85 px-1.5 py-0.5 text-[9px] font-semibold text-background">
                  Cover
                </span>
              )}
              <button
                type="button"
                aria-label={`Remove photo ${i + 1}`}
                onClick={() => set("images", draft.images.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-background/90 opacity-0 transition-opacity hover:bg-background group-hover:opacity-100 focus:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => set("images", [...draft.images, draft.images[0] ?? ""].filter(Boolean))}
            className="grid h-20 w-20 place-items-center gap-1 rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground sm:h-24 sm:w-24"
          >
            <ImagePlus className="h-5 w-5" />
            <span className="text-[10px] font-medium">Add</span>
          </button>
        </div>
      </div>

      <label className="mt-5 flex w-fit cursor-pointer items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={draft.isFeatured}
          onChange={(e) => set("isFeatured", e.target.checked)}
          className="h-4 w-4 rounded border-border accent-primary"
        />
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Star className="h-3.5 w-3.5" /> Feature this listing
        </span>
      </label>

      <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
        <button
          onClick={onCancel}
          className="h-11 rounded-xl border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(draft)}
          className="h-11 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
