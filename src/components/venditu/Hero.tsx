import { Search, MapPin, Tag, ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-illustration.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-accent/40 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Trusted by 240,000+ locals
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Buy and sell anything <span className="text-primary">near you.</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Venditu is a modern local marketplace to discover great deals, meet verified sellers, and list your items for free — in minutes.
          </p>

          {/* Composite search */}
          <div className="mt-8 rounded-2xl border border-border bg-card p-2 shadow-lg">
            <div className="grid gap-1 md:grid-cols-[1.4fr_1fr_1fr_auto] md:gap-2">
              <label className="group flex items-center gap-2.5 rounded-xl px-4 py-3 transition-colors hover:bg-secondary/60 md:py-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="What are you looking for?"
                  aria-label="Search"
                  className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                />
              </label>
              <label className="group flex items-center gap-2.5 rounded-xl border-t border-border px-4 py-3 transition-colors hover:bg-secondary/60 md:border-l md:border-t-0 md:py-2.5">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <select aria-label="Category" className="w-full bg-transparent text-sm focus:outline-none">
                  <option>All categories</option>
                  <option>Electronics</option>
                  <option>Vehicles</option>
                  <option>Real Estate</option>
                  <option>Furniture</option>
                </select>
              </label>
              <label className="group flex items-center gap-2.5 rounded-xl border-t border-border px-4 py-3 transition-colors hover:bg-secondary/60 md:border-l md:border-t-0 md:py-2.5">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Paris, FR"
                  aria-label="Location"
                  className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                />
              </label>
              <button className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:shadow-md active:scale-[0.98]">
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#listings" className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:shadow-md active:scale-[0.98]">
              Browse listings <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#sell" className="inline-flex h-11 items-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:border-primary/30">
              Sell an item
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { k: "1.2M+", v: "Active listings" },
              { k: "98%", v: "Verified sellers" },
              { k: "60s", v: "To post an ad" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="text-2xl font-bold tracking-tight text-foreground">{s.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl border border-border bg-secondary/40 shadow-xl">
            <img
              src={heroImg}
              alt="Venditu marketplace illustration"
              width={1200}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
