import { useState } from "react";
import { Bell, Search, Menu, X, Globe } from "lucide-react";
import { VenditutMark } from "./Logo";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "FR">("EN");

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2.5 font-semibold tracking-tight">
          <VenditutMark className="h-9 w-9" />
          <span className="text-lg text-foreground">Venditu</span>
        </a>

        {/* Search — desktop */}
        <div className="mx-auto hidden max-w-xl flex-1 md:flex">
          <div className="group relative w-full">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for anything..."
              aria-label="Search listings"
              className="h-11 w-full rounded-full border border-border bg-secondary/50 pl-11 pr-4 text-sm placeholder:text-muted-foreground transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <button
            aria-label="Notifications"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary md:inline-flex"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>

          <button
            onClick={() => setLang(lang === "EN" ? "FR" : "EN")}
            className="hidden h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary md:inline-flex"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            {lang}
          </button>

          <a
            href="#signin"
            className="hidden h-10 items-center rounded-full px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary md:inline-flex"
          >
            Sign in
          </a>
          <a
            href="#signup"
            className="hidden h-10 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/85 md:inline-flex"
          >
            Sign up
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border/60 px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search Venditu"
            className="h-10 w-full rounded-full border border-border bg-secondary/50 pl-11 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            <a href="#signin" className="flex h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-secondary">Sign in</a>
            <a href="#signup" className="flex h-11 items-center rounded-lg bg-foreground px-3 text-sm font-medium text-background">Sign up</a>
            <button className="flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-secondary">
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <button
              onClick={() => setLang(lang === "EN" ? "FR" : "EN")}
              className="flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-secondary"
            >
              <Globe className="h-4 w-4" /> Language: {lang}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
