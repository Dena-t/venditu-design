import { useEffect, useRef, useState } from "react";
import { browseListings, type BrowseListing } from "@/components/venditu/listings/data";

/** Fields the details page renders when the listings source provides them. */
export type DetailListing = BrowseListing & {
  description?: string;
  status?: string;
};

type State =
  | { phase: "loading" }
  | { phase: "error"; message: string }
  | { phase: "ready"; listing: DetailListing | null };

/** Loads `GET /listings` and resolves the item matching the URL id. */
export function useListing(id: string) {
  const [state, setState] = useState<State>({ phase: "loading" });

  useEffect(() => {
    let alive = true;
    setState({ phase: "loading" });

    const load = async () => {
      try {
        const listings = (await fetchListings()) as DetailListing[];
        if (!alive) return;
        setState({ phase: "ready", listing: listings.find((l) => String(l.id) === id) ?? null });
      } catch (e) {
        if (!alive) return;
        setState({ phase: "error", message: e instanceof Error ? e.message : "Failed to load listing" });
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  return state;
}

/** Single access point for the existing listings source. */
async function fetchListings(): Promise<BrowseListing[]> {
  const res = await fetch("/listings", { headers: { Accept: "application/json" } }).catch(() => null);
  if (res && res.ok && res.headers.get("content-type")?.includes("application/json")) {
    return (await res.json()) as BrowseListing[];
  }
  // No API server in this environment — fall back to the app's existing listings source.
  return browseListings;
}

/** Fires the existing authenticated view endpoint at most once per listing. */
export function useRecordView(id: string) {
  const sent = useRef<string | null>(null);

  useEffect(() => {
    if (!id || sent.current === id) return;
    sent.current = id;
    fetch(`/listings/${encodeURIComponent(id)}/view`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {
      /* view tracking must never break the page */
    });
  }, [id]);
}
