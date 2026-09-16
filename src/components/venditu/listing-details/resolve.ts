import { browseListings } from "@/components/venditu/listings/data";
import { myListings, type ListingStatus } from "@/components/venditu/my-listings/data";

/** Unified read-model for the details page. Built from the existing mock sources only. */
export interface ListingDetail {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  quantity: number;
  category: string;
  condition: string;
  city: string;
  province: string;
  status?: ListingStatus;
  images: string[];
  featured: boolean;
  seller: string;
  /** Not present in the current data model. */
  sellerRating?: number;
  postedAt?: string;
  views?: number;
  source: "browse" | "mine";
}

export function getListingById(id: string): ListingDetail | null {
  const browse = browseListings.find((l) => l.id === id);
  if (browse) {
    return {
      id: browse.id,
      price: browse.price,
      currency: browse.currency,
      title: browse.title,
      quantity: browse.quantity,
      category: browse.category,
      condition: browse.condition,
      city: browse.city,
      province: browse.province,
      images: browse.images,
      featured: !!browse.featured,
      seller: browse.seller,
      postedAt: browse.postedAt,
      source: "browse",
    };
  }

  const mine = myListings.find((l) => String(l.id) === id);
  if (mine) {
    return {
      id: String(mine.id),
      title: mine.title,
      description: mine.description,
      price: mine.price,
      currency: "$",
      quantity: mine.quantity,
      category: mine.category,
      condition: mine.condition,
      city: mine.city,
      province: mine.province,
      status: mine.status,
      images: mine.images,
      featured: mine.isFeatured,
      seller: "You",
      postedAt: mine.createdAt,
      views: mine.views,
      source: "mine",
    };
  }

  return null;
}
