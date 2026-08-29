import camera from "@/assets/listing-camera.jpg";
import chair from "@/assets/listing-chair.jpg";
import bike from "@/assets/listing-bike.jpg";
import laptop from "@/assets/listing-laptop.jpg";
import apartment from "@/assets/listing-apartment.jpg";
import watch from "@/assets/listing-watch.jpg";

export type ListingStatus = "active" | "draft" | "paused" | "sold";

export interface MyListing {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  condition: string;
  province: string;
  city: string;
  status: ListingStatus;
  isFeatured: boolean;
  createdAt: string;
  views: number;
  images: string[];
}

export const statusOptions: ListingStatus[] = ["active", "draft", "paused", "sold"];
export const conditionOptions = ["New", "Like New", "Good", "Fair"];
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

export type MySortKey = "newest" | "oldest" | "price-asc" | "price-desc";

const daysAgo = (d: number) => new Date(Date.now() - d * 86_400_000).toISOString();

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const myListings: MyListing[] = [
  { id: 1, title: 'MacBook Pro 14" M3', description: "Barely used, includes original box, charger and AppleCare until 2027.", price: 1200, quantity: 1, category: "Electronics", condition: "Like New", province: "Quebec", city: "Montreal", status: "active", isFeatured: true, createdAt: daysAgo(1), views: 127, images: [laptop, camera, watch] },
  { id: 2, title: "Leica M-A Rangefinder Camera", description: "Full mechanical rangefinder, no light meter. Clean glass, minor brassing.", price: 2450, quantity: 1, category: "Electronics", condition: "Good", province: "Ontario", city: "Toronto", status: "active", isFeatured: false, createdAt: daysAgo(3), views: 312, images: [camera, watch] },
  { id: 3, title: "Scandinavian Oak Armchair", description: "Solid oak frame with wool upholstery. Four available from a studio clearance.", price: 320, quantity: 4, category: "Furniture", condition: "Good", province: "Quebec", city: "Quebec City", status: "draft", isFeatured: false, createdAt: daysAgo(5), views: 18, images: [chair, apartment] },
  { id: 4, title: "VanMoof S5 Electric Bike", description: "Smart e-bike, 60km range, integrated lock and lights. Serviced last month.", price: 1890, quantity: 1, category: "Sports", condition: "Like New", province: "British Columbia", city: "Vancouver", status: "paused", isFeatured: true, createdAt: daysAgo(7), views: 204, images: [bike, laptop] },
  { id: 5, title: "Omega Seamaster Deville", description: "Vintage automatic, recently serviced. Original dial with light patina.", price: 2100, quantity: 1, category: "Fashion", condition: "Fair", province: "Alberta", city: "Calgary", status: "sold", isFeatured: false, createdAt: daysAgo(12), views: 890, images: [watch] },
  { id: 6, title: "Sunlit 2BR Apartment", description: "Bright corner unit near the canal, heating included, available October 1.", price: 1450, quantity: 1, category: "Real Estate", condition: "New", province: "Ontario", city: "Ottawa", status: "active", isFeatured: false, createdAt: daysAgo(8), views: 456, images: [apartment, chair] },
  { id: 7, title: "Vintage Film Camera Kit", description: "Three bodies, two lenses and a leather bag. Everything tested and working.", price: 480, quantity: 3, category: "Electronics", condition: "Good", province: "Quebec", city: "Laval", status: "active", isFeatured: false, createdAt: daysAgo(20), views: 76, images: [camera, laptop] },
  { id: 8, title: "Ergonomic Lounge Chair", description: "Mesh back office lounge chair, adjustable lumbar support. Six in stock.", price: 210, quantity: 6, category: "Furniture", condition: "Fair", province: "Ontario", city: "Mississauga", status: "paused", isFeatured: false, createdAt: daysAgo(4), views: 41, images: [chair] },
  { id: 9, title: "Carbon Road Bike", description: "Full carbon frame, Shimano 105 groupset, under 800km ridden.", price: 990, quantity: 2, category: "Sports", condition: "Like New", province: "British Columbia", city: "Victoria", status: "active", isFeatured: false, createdAt: daysAgo(6), views: 233, images: [bike, watch] },
  { id: 10, title: 'MacBook Air 13" M2', description: "Midnight finish, 16GB RAM, 512GB SSD. Battery health 96%.", price: 850, quantity: 5, category: "Electronics", condition: "Like New", province: "Quebec", city: "Montreal", status: "active", isFeatured: false, createdAt: daysAgo(9), views: 519, images: [laptop] },
  { id: 11, title: "Designer Wall Clock", description: "Minimal brass wall clock, silent sweep movement. New in box.", price: 120, quantity: 8, category: "Furniture", condition: "New", province: "Alberta", city: "Edmonton", status: "draft", isFeatured: false, createdAt: daysAgo(15), views: 12, images: [watch, chair] },
  { id: 12, title: "Loft Studio — Old Port", description: "Exposed brick loft with 14ft ceilings, steps from the waterfront.", price: 1290, quantity: 1, category: "Real Estate", condition: "New", province: "Quebec", city: "Montreal", status: "sold", isFeatured: true, createdAt: daysAgo(30), views: 1204, images: [apartment] },
  { id: 13, title: "Mountain Bike XT", description: "Hardtail with Deore XT drivetrain and dropper post. Trail ready.", price: 640, quantity: 3, category: "Sports", condition: "Good", province: "Quebec", city: "Gatineau", status: "active", isFeatured: false, createdAt: daysAgo(11), views: 168, images: [bike] },
  { id: 14, title: "Rare Photography Book Set", description: "Ten hardcover monographs, out of print. Excellent condition.", price: 95, quantity: 10, category: "Books", condition: "Good", province: "Ontario", city: "Toronto", status: "active", isFeatured: false, createdAt: daysAgo(18), views: 57, images: [camera, apartment] },
  { id: 15, title: "Swiss Chronograph Watch", description: "Automatic chronograph, sapphire crystal, box and papers included.", price: 3200, quantity: 1, category: "Fashion", condition: "New", province: "British Columbia", city: "Vancouver", status: "paused", isFeatured: false, createdAt: daysAgo(2), views: 388, images: [watch, camera] },
  { id: 16, title: "Walnut Dining Chairs (Set of 4)", description: "Mid-century walnut chairs, reupholstered in charcoal linen.", price: 540, quantity: 4, category: "Furniture", condition: "Like New", province: "Alberta", city: "Calgary", status: "sold", isFeatured: false, createdAt: daysAgo(22), views: 275, images: [chair, laptop] },
  { id: 17, title: "Studio Monitor Speakers", description: "Pair of 5-inch nearfield monitors with balanced inputs and stands.", price: 430, quantity: 2, category: "Electronics", condition: "Good", province: "Quebec", city: "Montreal", status: "draft", isFeatured: false, createdAt: daysAgo(26), views: 33, images: [laptop, watch] },
  { id: 18, title: "Cargo Bike Trailer", description: "Heavy-duty trailer, 45kg capacity, quick-release hitch included.", price: 260, quantity: 1, category: "Sports", condition: "Fair", province: "Ontario", city: "Hamilton", status: "active", isFeatured: false, createdAt: daysAgo(14), views: 61, images: [bike, apartment] },
];
