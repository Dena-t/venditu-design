import { useState } from "react";
import { Check, Eye, Loader2, Pencil, Save, Send, Sparkles, Tag } from "lucide-react";
import { Navbar } from "@/components/venditu/Navbar";
import { Footer } from "@/components/venditu/Footer";
import { categoryOptions, conditions, provinceOptions } from "@/components/venditu/listings/data";
import { Field, Select, TextArea, TextInput } from "./fields";
import { ImageUploader, type UploadedImage } from "./ImageUploader";
import { ListingMeta, type ListingMetaData } from "./ListingMeta";

const citiesByProvince: Record<string, string[]> = {
  Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
  Ontario: ["Toronto", "Ottawa", "Mississauga", "Hamilton"],
  "British Columbia": ["Vancouver", "Victoria", "Burnaby", "Kelowna"],
  Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
};

const statusOptions = ["Draft", "Active", "Paused", "Sold"];

const mockMeta: ListingMetaData = {
  owner: "John Smith",
  ownerInitials: "JS",
  ownerHandle: "@johnsmith · Member since 2023",
  createdAt: new Date().toISOString(),
  views: 125,
  verified: true,
};

type Busy = null | "save" | "post";

export function CreateListingPage() {
  const [editing, setEditing] = useState(true);
  const [busy, setBusy] = useState<Busy>(null);
  const [done, setDone] = useState<Busy>(null);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    province: "",
    city: "",
    quantity: "1",
    status: "Draft",
    featured: false,
  });

  const set = (p: Partial<typeof form>) => setForm((f) => ({ ...f, ...p }));
  const disabled = !editing;

  const run = (kind: Exclude<Busy, null>) => () => {
    setBusy(kind);
    setDone(null);
    window.setTimeout(() => {
      setBusy(null);
      setDone(kind);
      if (kind === "post") setEditing(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Tag className="h-3.5 w-3.5 text-primary" /> New listing
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Create a listing</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Add clear photos and accurate details so buyers can find and trust your item.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
            aria-label="Create listing form"
          >
            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="text-base font-semibold">Item details</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Listing title" htmlFor="cl-title" className="sm:col-span-2">
                  <TextInput
                    id="cl-title"
                    value={form.title}
                    disabled={disabled}
                    onChange={(e) => set({ title: e.target.value })}
                    placeholder='e.g. MacBook Pro 14" M3 — Like new'
                  />
                </Field>

                <Field
                  label="Description"
                  htmlFor="cl-desc"
                  className="sm:col-span-2"
                  hint="Mention condition details, included accessories and reason for selling."
                >
                  <TextArea
                    id="cl-desc"
                    rows={5}
                    value={form.description}
                    disabled={disabled}
                    onChange={(e) => set({ description: e.target.value })}
                    placeholder="Describe your item…"
                  />
                </Field>

                <Field label="Price" htmlFor="cl-price">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <TextInput
                      id="cl-price"
                      type="number"
                      min={0}
                      value={form.price}
                      disabled={disabled}
                      onChange={(e) => set({ price: e.target.value })}
                      placeholder="0.00"
                      className="pl-7"
                    />
                  </div>
                </Field>

                <Field label="Quantity" htmlFor="cl-qty">
                  <TextInput
                    id="cl-qty"
                    type="number"
                    min={1}
                    value={form.quantity}
                    disabled={disabled}
                    onChange={(e) => set({ quantity: e.target.value })}
                  />
                </Field>

                <Field label="Category" htmlFor="cl-cat">
                  <Select
                    id="cl-cat"
                    options={categoryOptions}
                    placeholder="Select a category"
                    value={form.category}
                    disabled={disabled}
                    onChange={(e) => set({ category: e.target.value })}
                  />
                </Field>

                <Field label="Condition" htmlFor="cl-cond">
                  <Select
                    id="cl-cond"
                    options={[...conditions]}
                    placeholder="Select a condition"
                    value={form.condition}
                    disabled={disabled}
                    onChange={(e) => set({ condition: e.target.value })}
                  />
                </Field>

                <Field label="Province" htmlFor="cl-prov">
                  <Select
                    id="cl-prov"
                    options={provinceOptions}
                    placeholder="Select a province"
                    value={form.province}
                    disabled={disabled}
                    onChange={(e) => set({ province: e.target.value, city: "" })}
                  />
                </Field>

                <Field
                  label="City"
                  htmlFor="cl-city"
                  hint={form.province ? undefined : "Choose a province first."}
                >
                  <Select
                    id="cl-city"
                    options={citiesByProvince[form.province] ?? []}
                    placeholder="Select a city"
                    value={form.city}
                    disabled={disabled || !form.province}
                    onChange={(e) => set({ city: e.target.value })}
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="text-base font-semibold">Photos</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Preview your images before posting — reorder the cover with the star action.
              </p>
              <div className="mt-5">
                <ImageUploader images={images} onChange={setImages} />
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
              <h2 className="text-base font-semibold">Visibility</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Status" htmlFor="cl-status">
                  <Select
                    id="cl-status"
                    options={statusOptions}
                    value={form.status}
                    disabled={disabled}
                    onChange={(e) => set({ status: e.target.value })}
                  />
                </Field>

                <Field label="Featured listing">
                  <div className="flex h-11 items-center justify-between gap-3 rounded-xl border border-border bg-background px-3.5">
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-primary" /> Promote in Featured
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={form.featured}
                      aria-label="Feature this listing"
                      disabled={disabled}
                      onClick={() => set({ featured: !form.featured })}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:opacity-50 ${
                        form.featured ? "bg-primary" : "bg-secondary"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform ${
                          form.featured ? "translate-x-[1.375rem]" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </Field>
              </div>
            </section>
          </form>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ListingMeta meta={mockMeta} />

            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold">Preview</h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-border">
                <div className="aspect-[4/3] bg-secondary">
                  {images[0] ? (
                    <img src={images[0].url} alt="Listing cover preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center text-xs text-muted-foreground">
                      No photo yet
                    </div>
                  )}
                </div>
                <div className="space-y-1 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-2 text-sm font-semibold">
                      {form.title || "Your listing title"}
                    </p>
                    <span className="shrink-0 text-sm font-bold text-primary">
                      ${form.price || "0"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {[form.city, form.province].filter(Boolean).join(", ") || "Location"} ·{" "}
                    {form.condition || "Condition"}
                  </p>
                  <p className="inline-flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" /> {mockMeta.views} views
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring/30"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </button>
                <button
                  type="button"
                  onClick={run("save")}
                  disabled={busy !== null}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:opacity-60"
                >
                  {busy === "save" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save draft
                </button>
                <button
                  type="button"
                  onClick={run("post")}
                  disabled={busy !== null}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-60"
                >
                  {busy === "post" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Post listing
                </button>
              </div>
              {done && (
                <p
                  role="status"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                >
                  <Check className="h-3.5 w-3.5 text-primary" />
                  {done === "save" ? "Draft saved" : "Listing posted — form locked for review"}
                </p>
              )}
            </section>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
