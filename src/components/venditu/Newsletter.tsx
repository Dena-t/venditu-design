import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-12 text-background sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/10 px-3 py-1 text-xs">
            <Mail className="h-3.5 w-3.5" /> Weekly picks
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Get the best deals in your inbox.</h2>
          <p className="mt-3 text-sm text-background/70">One curated newsletter per week. No spam. Unsubscribe anytime.</p>

          <form
            onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-2 rounded-2xl bg-background/5 p-2 backdrop-blur sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@venditu.com"
              className="h-11 flex-1 rounded-xl bg-background/10 px-4 text-sm text-background placeholder:text-background/50 focus:outline-none focus:ring-2 focus:ring-primary/70"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {sent ? "Subscribed ✓" : (<>Subscribe <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
