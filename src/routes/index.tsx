import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/venditu/Navbar";
import { Hero } from "@/components/venditu/Hero";
import { Categories } from "@/components/venditu/Categories";
import { LatestListings, FeaturedListings } from "@/components/venditu/Listings";
import { Features } from "@/components/venditu/Features";
import { MobileApp } from "@/components/venditu/MobileApp";
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
        <LatestListings />
        <FeaturedListings />
        <Features />
        <MobileApp />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
