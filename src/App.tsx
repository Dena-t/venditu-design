import { Navbar } from "@/components/venditu/Navbar";
import { Hero } from "@/components/venditu/Hero";
import { Categories } from "@/components/venditu/Categories";
import { SellForYou } from "@/components/venditu/SellForYou";
import { LatestListings, FeaturedListings } from "@/components/venditu/Listings";
import { Features } from "@/components/venditu/Features";
import { Newsletter } from "@/components/venditu/Newsletter";
import { Footer } from "@/components/venditu/Footer";
import { SignUp } from "@/components/venditu/SignUp";
import { SignIn } from "@/components/venditu/SignIn";
import { ListingsPage } from "@/components/venditu/listings/ListingsPage";
import { CreateListingPage } from "@/components/venditu/create-listing/CreateListingPage";

export default function App() {
  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  if (path === "/signup") return <SignUp />;
  if (path === "/signin") return <SignIn />;
  if (path === "/listings") return <ListingsPage />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <SellForYou />
        <LatestListings />
        <FeaturedListings />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
