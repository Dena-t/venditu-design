type LogoProps = {
  className?: string;
  variant?: "color" | "mono";
  showWordmark?: boolean;
};

export function Logo({ className, variant = "color", showWordmark = true }: LogoProps) {
  const markColor = variant === "mono" ? "currentColor" : "var(--color-primary)";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <VenditutMark className="h-8 w-8" color={markColor} />
      {showWordmark && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Venditu
        </span>
      )}
    </span>
  );
}

/**
 * Venditu mark — a minimalist V formed by a storefront awning.
 * The rounded-square container reads as a storefront; the negative-space
 * notch at the top creates a subtle V, symbolizing exchange between two sides.
 */
export function VenditutMark({
  className,
  color = "var(--color-primary)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Storefront silhouette with a V-shaped notch cut from the top edge */}
      <path
        d="M8 12 A4 4 0 0 1 12 8 H16 L20 14 L24 8 H28 A4 4 0 0 1 32 12 V28 A4 4 0 0 1 28 32 H12 A4 4 0 0 1 8 28 Z"
        fill={color}
      />
      {/* Inner doorway — a tall arch centered, tying to the marketplace/storefront idea */}
      <path
        d="M17 32 V24 A3 3 0 0 1 20 21 A3 3 0 0 1 23 24 V32 Z"
        fill="var(--color-background)"
      />
    </svg>
  );
}
