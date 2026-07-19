import { ShieldCheck, BadgeCheck, SearchCheck, MessageSquare, Sparkles } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Secure marketplace", desc: "End-to-end encrypted chats and buyer protection on every trade." },
  { icon: BadgeCheck, title: "Verified users", desc: "ID and phone verification badges you can trust at a glance." },
  { icon: SearchCheck, title: "Easy search", desc: "Smart filters, saved searches and instant alerts for new matches." },
  { icon: MessageSquare, title: "Fast messaging", desc: "Reply in one tap, translate on the fly, and negotiate securely." },
  { icon: Sparkles, title: "Free listings", desc: "Publish your ads for free — no hidden fees, no commission." },
];

export function Features() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why choose Venditu</h2>
          <p className="mt-3 text-base text-muted-foreground">Built to make local trading feel effortless, safe, and premium.</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
