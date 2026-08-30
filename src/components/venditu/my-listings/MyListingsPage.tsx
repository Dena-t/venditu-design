import { useEffect, useMemo, useState } from "react";
import { Plus, CheckCircle2, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/venditu/Navbar";
import { Footer } from "@/components/venditu/Footer";
import { MyListingsToolbar, type StatusFilter } from "./MyListingsToolbar";
import { ListingManagementCard } from "./ListingManagementCard";
import { DeleteListingDialog } from "./DeleteListingDialog";
import { ListingPagination } from "./ListingPagination";
import { ListingEmptyState, ListingNoResults, ListingSkeleton } from "./ListingStates";
import { myListings, type MyListing, type MySortKey } from "./data";

const PAGE_SIZE = 10;

export function MyListingsPage() {
  const [listings, setListings] = useState<MyListing[]>(myListings);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<MySortKey>("newest");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingDelete, setPendingDelete] = useState<MyListing | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const results = useMemo(() => {
    const s = search.trim().toLowerCase();
    const filtered = listings.filter((l) => {
      if (status !== "all" && l.status !== status) return false;
      if (s && !`${l.title} ${l.category} ${l.city} ${l.province}`.toLowerCase().includes(s))
        return false;
      return true;
    });
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "oldest":
          return +new Date(a.createdAt) - +new Date(b.createdAt);
        default:
          return +new Date(b.createdAt) - +new Date(a.createdAt);
      }
    });
  }, [listings, search, status, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const shown = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const reset = () => {
    setSearch("");
    setStatus("all");
    setSort("newest");
    setPage(1);
  };

  const save = (id: number, patch: Partial<MyListing>) => {
    setListings((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    setEditingId(null);
    setToast("Listing updated successfully");
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setListings((ls) => ls.filter((l) => l.id !== pendingDelete.id));
    if (editingId === pendingDelete.id) setEditingId(null);
    setPendingDelete(null);
    setToast("Listing deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <a href="/" className="transition-colors hover:text-foreground">
            Home
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">My Listings</span>
        </nav>

        <header className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Listings</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage, edit, and track your listings.
            </p>
          </div>
          <a
            href="/create-listing"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Plus className="h-4 w-4" /> Create Listing
          </a>
        </header>

        <div className="mt-6">
          <MyListingsToolbar
            search={search}
            status={status}
            sort={sort}
            onSearch={(v) => {
              setSearch(v);
              setPage(1);
            }}
            onStatus={(v) => {
              setStatus(v);
              setPage(1);
            }}
            onSort={setSort}
          />
        </div>

        <div className="mt-8">
          {loading ? (
            <ListingSkeleton />
          ) : listings.length === 0 ? (
            <ListingEmptyState />
          ) : results.length === 0 ? (
            <ListingNoResults onClear={reset} />
          ) : (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{results.length}</span> listing
                {results.length === 1 ? "" : "s"}
              </p>
              <div className="space-y-4">
                {shown.map((l) => (
                  <ListingManagementCard
                    key={l.id}
                    listing={l}
                    editing={editingId === l.id}
                    onEdit={() => setEditingId(l.id)}
                    onCancelEdit={() => setEditingId(null)}
                    onSave={(patch) => save(l.id, patch)}
                    onDelete={() => setPendingDelete(l)}
                  />
                ))}
              </div>
              <ListingPagination
                page={current}
                totalPages={totalPages}
                onChange={(p) => {
                  setPage(p);
                  setEditingId(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          )}
        </div>
      </main>

      {pendingDelete && (
        <DeleteListingDialog
          title={pendingDelete.title}
          onCancel={() => setPendingDelete(null)}
          onConfirm={confirmDelete}
        />
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium shadow-lg"
        >
          <CheckCircle2 className="h-4 w-4 text-success" />
          {toast}
        </div>
      )}

      <Footer />
    </div>
  );
}
