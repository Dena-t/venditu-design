import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/venditu/Navbar";
import { Hero } from "@/components/venditu/Hero";
import { Categories } from "@/components/venditu/Categories";
import { SellForYou } from "@/components/venditu/SellForYou";
import { LatestListings, FeaturedListings } from "@/components/venditu/Listings";
import { Features } from "@/components/venditu/Features";

import { Newsletter } from "@/components/venditu/Newsletter";
import { Footer } from "@/components/venditu/Footer";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
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
