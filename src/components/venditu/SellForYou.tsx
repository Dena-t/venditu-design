import { ArrowRight, CheckCircle2, Camera, Truck, Wallet } from "lucide-react";
import illustration from "@/assets/sell-for-you.jpg";

const perks = [
  { icon: Camera, label: "We photograph & list your items" },
  { icon: Truck, label: "Free pickup and shipping handled" },
  { icon: Wallet, label: "Get paid securely, hassle-free" },
];

export function SellForYou() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/[0.06] via-background to-accent/[0.08] p-6 sm:p-10 lg:p-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-primary shadow-xs backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              New — Concierge selling
            </span>

            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.05]">
              Too busy to sell?{" "}
              <span className="text-primary">We sell it for you.</span>
            </h2>

            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Hand us your items and our experts will price, list, and negotiate on your behalf. You keep up to 85% of the sale — we handle the rest.
            </p>

            <ul className="mt-7 space-y-3">
              {perks.map((p) => (
                <li key={p.label} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <p.icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium text-foreground">{p.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/sell-for-you"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-lg active:scale-[0.98]"
              >
                Start selling for me <ArrowRight className="h-4 w-4" />
              </a>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No listing fees · Cancel anytime
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
              <img
                src={illustration}
                alt="Venditu concierge helping a seller list items"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-border bg-background/85 px-4 py-3 shadow-md backdrop-blur">
                <div>
                  <div className="text-xs text-muted-foreground">Avg. sale time</div>
                  <div className="text-sm font-semibold">Under 5 days</div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <div className="text-xs text-muted-foreground">Seller keeps</div>
                  <div className="text-sm font-semibold text-primary">up to 85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
