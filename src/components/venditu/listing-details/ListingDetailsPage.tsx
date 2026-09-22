import { useState } from "react";
import {
  ChevronRight,
  MapPin,
  Package,
  Tag,
  CalendarDays,
  Eye,
  AlertTriangle,
  Loader2,
  MessageCircle,
  User,
} from "lucide-react";
import { Navbar } from "@/components/venditu/Navbar";
import { Footer } from "@/components/venditu/Footer";
import { timeAgo } from "@/components/venditu/listings/data";
import { ImageGallery } from "./ImageGallery";
import { SellerRating } from "./SellerRating";
import { ContactSellerDrawer } from "./ContactSellerDrawer";
import { useListing, useRecordView } from "./useListing";

export function ListingDetailsPage({ id }: { id: string }) {
  const state = useListing(id);
  const [drawer, setDrawer] = useState(false);
  useRecordView(id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <a href="/" className="transition-colors hover:text-foreground">
            Home
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <a href="/listings" className="transition-colors hover:text-foreground">
            Browse Listings
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">Details</span>
        </nav>

        {state.phase === "loading" && (
          <div className="mt-16 flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="text-sm">Loading listing…</p>
          </div>
        )}

        {state.phase === "error" && (
          <Message
            icon={<AlertTriangle className="h-6 w-6" />}
            title="Something went wrong"
            body={state.message}
          />
        )}

        {state.phase === "ready" && !state.listing && (
          <Message
            icon={<AlertTriangle className="h-6 w-6" />}
            title="Listing not found"
            body="This listing may have been removed or the link is incorrect."
          />
        )}

        {state.phase === "ready" && state.listing && (
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <ImageGallery images={state.listing.images} title={state.listing.title} />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                {state.listing.featured && (
                  <span className="rounded-full bg-foreground px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                    Featured
                  </span>
                )}
                {state.listing.status && (
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {state.listing.status}
                  </span>
                )}
                <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {state.listing.condition}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{state.listing.title}</h1>

              <p className="mt-3 text-3xl font-bold text-primary">
                {state.listing.currency}
                {Number(state.listing.price).toLocaleString()}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 text-sm">
                <Row icon={<Tag className="h-4 w-4" />} label="Category" value={state.listing.category} />
                <Row
                  icon={<Package className="h-4 w-4" />}
                  label="Quantity"
                  value={`${state.listing.quantity} available`}
                />
                <Row
                  icon={<MapPin className="h-4 w-4" />}
                  label="Location"
                  value={`${state.listing.city}, ${state.listing.province}`}
                />
                <Row
                  icon={<CalendarDays className="h-4 w-4" />}
                  label="Posted"
                  value={timeAgo(state.listing.postedAt)}
                />
              </dl>

              <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground" title="Views">
                <Eye className="h-4 w-4" />
                <span>Views</span>
              </div>

              {state.listing.description && (
                <section className="mt-8">
                  <h2 className="text-base font-semibold">Description</h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {state.listing.description}
                  </p>
                </section>
              )}

              <section className="mt-8 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary">
                      <User className="h-5 w-5 text-secondary-foreground" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">@{state.listing.seller}</p>
                      <SellerRating seller={state.listing.seller} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setDrawer(true)}
                  className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  <MessageCircle className="h-4 w-4" /> Contact Seller
                </button>
              </section>
            </div>
          </div>
        )}
      </main>

      {state.phase === "ready" && state.listing && (
        <ContactSellerDrawer open={drawer} seller={state.listing.seller} onClose={() => setDrawer(false)} />
      )}

      <Footer />
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="truncate font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}

function Message({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="mt-16 flex flex-col items-center gap-3 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-secondary text-foreground">{icon}</span>
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
      <a
        href="/listings"
        className="mt-2 inline-flex h-11 items-center rounded-xl border border-border bg-background px-6 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        Back to listings
      </a>
    </div>
  );
}
