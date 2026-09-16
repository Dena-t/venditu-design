import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  Package,
  Tag,
  Sparkles,
  ShoppingBasket,
  Check,
  Star,
  Eye,
} from "lucide-react";
import { Navbar } from "@/components/venditu/Navbar";
import { Footer } from "@/components/venditu/Footer";
import { StatusBadge } from "@/components/venditu/my-listings/StatusBadge";
import { ImageGallery } from "./ImageGallery";
import { MessageSeller } from "./MessageSeller";
import { addToBasket } from "./basket";
import { getListingById } from "./resolve";

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        {icon} {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}

export function ListingDetailsPage({ id }: { id: string }) {
  const listing = useMemo(() => getListingById(id), [id]);
  const [added, setAdded] = useState(false);

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto grid max-w-3xl place-items-center px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">Listing not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This listing may have been removed or the link is incorrect.
          </p>
          <a
            href="/listings"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to listings
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const backHref = listing.source === "mine" ? "/my-listings" : "/listings";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <a href="/" className="transition-colors hover:text-foreground">
            Home
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <a href={backHref} className="transition-colors hover:text-foreground">
            {listing.source === "mine" ? "My Listings" : "Listings"}
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate font-medium text-foreground">{listing.title}</span>
        </nav>

        <a
          href={backHref}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </a>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ImageGallery images={listing.images} title={listing.title} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              {listing.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background">
                  <Sparkles className="h-3 w-3" /> Featured
                </span>
              )}
              {listing.status && <StatusBadge status={listing.status} />}
            </div>

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{listing.title}</h1>
            <p className="mt-3 text-3xl font-bold text-primary">
              {listing.currency}
              {listing.price.toLocaleString()}
            </p>

            <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card px-4">
              <Row icon={<Package className="h-4 w-4" />} label="Quantity" value={`${listing.quantity} available`} />
              <Row icon={<Tag className="h-4 w-4" />} label="Category" value={listing.category} />
              <Row icon={<Sparkles className="h-4 w-4" />} label="Condition" value={listing.condition} />
              <Row
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={`${listing.city}, ${listing.province}`}
              />
              {typeof listing.views === "number" && (
                <Row
                  icon={<Eye className="h-4 w-4" />}
                  label="Views"
                  value={listing.views.toLocaleString()}
                />
              )}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-foreground">
                {listing.seller.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Seller</p>
                <p className="truncate text-sm font-semibold">{listing.seller}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-muted-foreground">Rating</p>
                {typeof listing.sellerRating === "number" ? (
                  <p className="inline-flex items-center gap-1 text-sm font-semibold">
                    {listing.sellerRating.toFixed(1)}
                    <Star className="h-3.5 w-3.5 fill-current" />
                  </p>
                ) : (
                  <p className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Star className="h-3.5 w-3.5" /> Not rated yet
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => {
                  addToBasket({
                    id: listing.id,
                    title: listing.title,
                    price: listing.price,
                    currency: listing.currency,
                    image: listing.images[0],
                    quantity: 1,
                  });
                  setAdded(true);
                }}
                className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors ${
                  added
                    ? "bg-success text-background"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" /> Added to Basket
                  </>
                ) : (
                  <>
                    <ShoppingBasket className="h-4 w-4" /> Add to Basket
                  </>
                )}
              </button>

              <MessageSeller seller={listing.seller} />
            </div>
          </div>
        </div>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight">Description</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {listing.description ?? "No description was provided for this listing."}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
