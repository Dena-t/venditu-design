// Public marketplace catalog data exposed through the MCP server.
// Pure data only — no env reads, no I/O (this module is import-safe).

export type CatalogListing = {
  id: string;
  title: string;
  price: string;
  location: string;
  postedAgo: string;
  rating: number;
  category: string;
  featured: boolean;
};

export const categories: { name: string; listings: string }[] = [
  { name: "Electronics", listings: "24,320" },
  { name: "Vehicles", listings: "18,912" },
  { name: "Real Estate", listings: "9,204" },
  { name: "Jobs", listings: "6,540" },
  { name: "Furniture", listings: "12,830" },
  { name: "Fashion", listings: "31,215" },
  { name: "Home & Garden", listings: "10,120" },
  { name: "Sports", listings: "7,410" },
  { name: "Books", listings: "5,320" },
  { name: "Pets", listings: "2,910" },
  { name: "Services", listings: "8,725" },
  { name: "Other", listings: "3,411" },
];

export const listings: CatalogListing[] = [
  { id: "1", title: "Leica M-A Rangefinder Camera", price: "€2,450", location: "Paris 3e, FR", postedAgo: "2h ago", rating: 4.9, category: "Electronics", featured: false },
  { id: "2", title: "Scandinavian Oak Armchair", price: "€320", location: "Lyon, FR", postedAgo: "5h ago", rating: 4.8, category: "Furniture", featured: false },
  { id: "3", title: "VanMoof S5 Electric Bike", price: "€1,890", location: "Bordeaux, FR", postedAgo: "1d ago", rating: 4.7, category: "Sports", featured: false },
  { id: "4", title: 'MacBook Pro 14" M3 — Mint', price: "€1,650", location: "Marseille, FR", postedAgo: "3h ago", rating: 5.0, category: "Electronics", featured: false },
  { id: "5", title: "Omega Seamaster Deville", price: "€2,100", location: "Nice, FR", postedAgo: "1d ago", rating: 4.9, category: "Fashion", featured: false },
  { id: "6", title: "Sunlit 2BR Apartment — Downtown", price: "€1,450/mo", location: "Toulouse, FR", postedAgo: "6h ago", rating: 4.8, category: "Real Estate", featured: false },
  { id: "f1", title: "Loft 90m² · Balcony · Herringbone floors", price: "€1,450/mo", location: "Toulouse, FR", postedAgo: "Featured", rating: 4.9, category: "Real Estate", featured: true },
  { id: "f2", title: 'MacBook Pro 14" M3 · AppleCare+', price: "€1,650", location: "Marseille, FR", postedAgo: "Featured", rating: 5.0, category: "Electronics", featured: true },
  { id: "f3", title: "VanMoof S5 · 500 km · Full warranty", price: "€1,890", location: "Bordeaux, FR", postedAgo: "Featured", rating: 4.8, category: "Sports", featured: true },
];

export const designTokens: Record<string, string> = {
  primary: "#4A235A",
  secondary: "#6C3483",
  accent: "#294541",
  background: "#F8F7F5",
  surface: "#FFFFFF",
  text: "#1F2937",
  border: "#E5E7EB",
  success: "#22C55E",
  typography: "Inter",
  spacing: "8px base scale",
};
