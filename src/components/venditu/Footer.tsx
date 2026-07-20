import { Twitter, Facebook, Instagram, Youtube, Globe } from "lucide-react";
import { VenditutMark } from "./Logo";

const sections = [
  { title: "Marketplace", links: ["Browse listings", "Post an ad", "Featured", "Categories", "Deals"] },
  { title: "Support", links: ["Help center", "Safety tips", "Contact us", "Report a listing", "Community"] },
  { title: "Company", links: ["About Venditu", "Careers", "Press", "Blog", "Investors"] },
  { title: "Legal", links: ["Terms of service", "Privacy policy", "Cookies", "Trust & safety", "Accessibility"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Store className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="text-lg font-semibold tracking-tight">Venditu</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The premium local marketplace — buy and sell anything near you, safely.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {s.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">© 2026 Venditu, Inc. All rights reserved.</p>
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
            <Globe className="h-3.5 w-3.5" /> English (EN)
          </button>
        </div>
      </div>
    </footer>
  );
}
