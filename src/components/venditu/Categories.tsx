import {
  Smartphone, Car, Home, Briefcase, Sofa, Shirt, Flower2,
  Dumbbell, BookOpen, PawPrint, Wrench, MoreHorizontal, type LucideIcon,
} from "lucide-react";

const cats: { name: string; icon: LucideIcon; count: string }[] = [
  { name: "Electronics", icon: Smartphone, count: "24,320" },
  { name: "Vehicles", icon: Car, count: "18,912" },
  { name: "Real Estate", icon: Home, count: "9,204" },
  { name: "Jobs", icon: Briefcase, count: "6,540" },
  { name: "Furniture", icon: Sofa, count: "12,830" },
  { name: "Fashion", icon: Shirt, count: "31,215" },
  { name: "Home & Garden", icon: Flower2, count: "10,120" },
  { name: "Sports", icon: Dumbbell, count: "7,410" },
  { name: "Books", icon: BookOpen, count: "5,320" },
  { name: "Pets", icon: PawPrint, count: "2,910" },
  { name: "Services", icon: Wrench, count: "8,725" },
  { name: "Other", icon: MoreHorizontal, count: "3,411" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Browse by category</h2>
          <p className="mt-2 text-sm text-muted-foreground">Find exactly what you need across 12 curated categories.</p>
        </div>
        <a href="#all" className="hidden text-sm font-medium text-primary hover:underline sm:inline">See all →</a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {cats.map((c) => (
          <a
            key={c.name}
            href={`#cat-${c.name}`}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <c.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-foreground">{c.name}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{c.count} listings</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
