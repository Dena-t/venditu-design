import { Apple, Play, Check } from "lucide-react";
import mobileImg from "@/assets/mobile-app.jpg";

export function MobileApp() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/8 via-card to-accent/20 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            Available on iOS & Android
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Venditu on the go.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Snap, list and chat in seconds. Get instant push alerts when new items you love drop nearby.
          </p>

          <ul className="mt-6 space-y-2.5">
            {["Post an item in under 60 seconds", "Real-time notifications and messages", "Offline drafts and one-tap re-list"].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm text-foreground">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#app-store" className="inline-flex h-12 items-center gap-3 rounded-xl bg-foreground px-5 text-background transition-transform hover:-translate-y-0.5">
              <Apple className="h-6 w-6" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-widest opacity-70">Download on the</span>
                <span className="block text-sm font-semibold">App Store</span>
              </span>
            </a>
            <a href="#play-store" className="inline-flex h-12 items-center gap-3 rounded-xl bg-foreground px-5 text-background transition-transform hover:-translate-y-0.5">
              <Play className="h-5 w-5 fill-current" />
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-widest opacity-70">Get it on</span>
                <span className="block text-sm font-semibold">Google Play</span>
              </span>
            </a>
          </div>
        </div>

        <div className="relative flex items-end justify-center overflow-hidden p-6 lg:p-0">
          <img
            src={mobileImg}
            alt="Venditu mobile app"
            loading="lazy"
            className="h-full max-h-[560px] w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
