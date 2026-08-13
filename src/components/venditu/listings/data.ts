import camera from "@/assets/listing-camera.jpg";
import chair from "@/assets/listing-chair.jpg";
import bike from "@/assets/listing-bike.jpg";
import laptop from "@/assets/listing-laptop.jpg";
import apartment from "@/assets/listing-apartment.jpg";
import watch from "@/assets/listing-watch.jpg";

/** Shape mirrors a future `GET /listings` response item. */
export interface BrowseListing {
  id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  quantity: number;
  condition: Condition;
  city: string;
  province: string;
  category: string;
  seller: string;
  postedAt: string; // ISO date
  featured?: boolean;
}

export const conditions = ["New", "Like New", "Good", "Fair"] as const;
export type Condition = (typeof conditions)[number];

export const categoryOptions = [
  "Electronics",
  "Vehicles",
  "Real Estate",
  "Furniture",
  "Fashion",
  "Sports",
  "Books",
];

export const provinceOptions = ["Quebec", "Ontario", "British Columbia", "Alberta"];

const daysAgo = (d: number) => new Date(Date.now() - d * 86_400_000).toISOString();

export const browseListings: BrowseListing[] = [
  { id: "l1", title: 'MacBook Pro 14" M3', price: 1650, currency: "$", images: [laptop, camera, watch], quantity: 2, condition: "Like New", city: "Montreal", province: "Quebec", category: "Electronics", seller: "John Smith", postedAt: daysAgo(2), featured: true },
  { id: "l2", title: "Leica M-A Rangefinder Camera", price: 2450, currency: "$", images: [camera, watch], quantity: 1, condition: "Good", city: "Toronto", province: "Ontario", category: "Electronics", seller: "Amelia Doyon", postedAt: daysAgo(1) },
  { id: "l3", title: "Scandinavian Oak Armchair", price: 320, currency: "$", images: [chair, apartment], quantity: 4, condition: "Good", city: "Quebec City", province: "Quebec", category: "Furniture", seller: "Marc Tremblay", postedAt: daysAgo(5) },
  { id: "l4", title: "VanMoof S5 Electric Bike", price: 1890, currency: "$", images: [bike, laptop], quantity: 1, condition: "Like New", city: "Vancouver", province: "British Columbia", category: "Sports", seller: "Priya Nair", postedAt: daysAgo(3), featured: true },
  { id: "l5", title: "Omega Seamaster Deville", price: 2100, currency: "$", images: [watch], quantity: 1, condition: "Fair", city: "Calgary", province: "Alberta", category: "Fashion", seller: "Liam Becker", postedAt: daysAgo(12) },
  { id: "l6", title: "Sunlit 2BR Apartment", price: 1450, currency: "$", images: [apartment, chair], quantity: 1, condition: "New", city: "Ottawa", province: "Ontario", category: "Real Estate", seller: "Nadia Rousseau", postedAt: daysAgo(8) },
  { id: "l7", title: "Vintage Film Camera Kit", price: 480, currency: "$", images: [camera, laptop], quantity: 3, condition: "Good", city: "Laval", province: "Quebec", category: "Electronics", seller: "Étienne Roy", postedAt: daysAgo(20) },
  { id: "l8", title: "Ergonomic Lounge Chair", price: 210, currency: "$", images: [chair], quantity: 6, condition: "Fair", city: "Mississauga", province: "Ontario", category: "Furniture", seller: "Sara Whitman", postedAt: daysAgo(4) },
  { id: "l9", title: "Carbon Road Bike", price: 990, currency: "$", images: [bike, watch], quantity: 2, condition: "Like New", city: "Victoria", province: "British Columbia", category: "Sports", seller: "Owen Park", postedAt: daysAgo(6) },
  { id: "l10", title: 'MacBook Air 13" M2', price: 850, currency: "$", images: [laptop], quantity: 5, condition: "Like New", city: "Montreal", province: "Quebec", category: "Electronics", seller: "John Smith", postedAt: daysAgo(9) },
  { id: "l11", title: "Designer Wall Clock", price: 120, currency: "$", images: [watch, chair], quantity: 8, condition: "New", city: "Edmonton", province: "Alberta", category: "Furniture", seller: "Hana Ito", postedAt: daysAgo(15) },
  { id: "l12", title: "Loft Studio — Old Port", price: 1290, currency: "$", images: [apartment], quantity: 1, condition: "New", city: "Montreal", province: "Quebec", category: "Real Estate", seller: "Nadia Rousseau", postedAt: daysAgo(30), featured: true },
  { id: "l13", title: "Mountain Bike XT", price: 640, currency: "$", images: [bike], quantity: 3, condition: "Good", city: "Gatineau", province: "Quebec", category: "Sports", seller: "Marc Tremblay", postedAt: daysAgo(11) },
  { id: "l14", title: "Rare Photography Book Set", price: 95, currency: "$", images: [camera, apartment], quantity: 10, condition: "Good", city: "Toronto", province: "Ontario", category: "Books", seller: "Amelia Doyon", postedAt: daysAgo(18) },
  { id: "l15", title: "Swiss Chronograph Watch", price: 3200, currency: "$", images: [watch, camera], quantity: 1, condition: "New", city: "Vancouver", province: "British Columbia", category: "Fashion", seller: "Priya Nair", postedAt: daysAgo(7) },
  { id: "l16", title: "Walnut Dining Chairs (Set of 4)", price: 540, currency: "$", images: [chair, laptop], quantity: 4, condition: "Like New", city: "Calgary", province: "Alberta", category: "Furniture", seller: "Liam Becker", postedAt: daysAgo(22) },
];

export function timeAgo(iso: string) {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.round(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}
