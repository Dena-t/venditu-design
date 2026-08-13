import type { Condition } from "./data";

/** Maps 1:1 to future `GET /listings?...` query params. */
export interface ListingQuery {
  search: string;
  city: string;
  category: string;
  province: string;
  minPrice: string;
  maxPrice: string;
  conditions: Condition[];
  minQuantity: string;
  sort: SortKey;
}

export type SortKey = "newest" | "oldest" | "price-asc" | "price-desc";

export const defaultQuery: ListingQuery = {
  search: "",
  city: "",
  category: "",
  province: "",
  minPrice: "",
  maxPrice: "",
  conditions: [],
  minQuantity: "",
  sort: "newest",
};
