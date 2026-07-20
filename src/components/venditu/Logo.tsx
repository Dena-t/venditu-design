type LogoProps = {
  className?: string;
  variant?: "color" | "mono";
  showWordmark?: boolean;
};

export function Logo({ className, variant = "color", showWordmark = true }: LogoProps) {
  const markColor = variant === "mono" ? "currentColor" : "var(--color-primary)";
  const dotColor = variant === "mono" ? "currentColor" : "var(--color-accent)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <VenditutMark className="h-8 w-8" color={markColor} dotColor={dotColor} />
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Venditu
        </span>
      )}
    </span>
  );
}

/**
 * Venditu mark — a modern minimal price/sale tag.
 * A rounded tag silhouette with a punched hole (negative space) and a
 * subtle accent dot suggesting a deal / transaction.
 */
export function VenditutMark({
  className,
  color = "var(--color-primary)",
  dotColor = "var(--color-accent)",
}: {
  className?: string;
  color?: string;
  dotColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Price tag body: rounded rectangle with an angled top-left corner
          pointing to the hole — evoke_removed a classic sale/price tag. */}
      <path
        d="M15.2 4.6 L34 4.6 A2.4 2.4 0 0 1 36.4 7 V25.8 A3.2 3.2 0 0 1 35.46 28.06 L28.06 35.46 A3.2 3.2 0 0 1 25.8 36.4 H7 A2.4 2.4 0 0 1 4.6 34 V15.2 A3.2 3.2 0 0 1 5.54 12.94 L12.94 5.54 A3.2 3.2 0 0 1 15.2 4.6 Z"
        fill={color}
      />
      {/* Punch hole — negative space in tag */}
      <circle cx="13" cy="13" r="3.2" fill="var(--color-background)" />
      {/* Accent dot — subtle deal/spark */}
      <circle cx="27" cy="27" r="2.6" fill={dotColor} />
    </svg>
  );
}
