import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { BrowseListing } from "@/components/venditu/listings/data";

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

/** Loads the real listings from the backend `GET /listings` endpoint. */
async function fetchListings(): Promise<BrowseListing[]> {
  const res = await fetch("/listings", { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`Failed to load listing (status ${res.status})`);
  }
  return (await res.json()) as BrowseListing[];
}

/**
 * Fires the existing `POST /listings/:id/view` endpoint at most once per listing.
 *
 * Uses the project's existing JWT mechanism: the Supabase session access token,
 * sent as an `Authorization: Bearer <token>` header. When the user is not signed
 * in, no request is made. A failed view-count request never breaks the page.
 */
export function useRecordView(id: string) {
  const sent = useRef<string | null>(null);

  useEffect(() => {
    if (!id || sent.current === id) return;
    sent.current = id;

    const recordView = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) return; // not signed in — skip the authenticated request

        await fetch(`/listings/${encodeURIComponent(id)}/view`, {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
      } catch {
        /* view tracking must never break the page */
      }
    };

    recordView();
  }, [id]);
}
