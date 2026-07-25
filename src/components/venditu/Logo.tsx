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
 * Venditu mark — modern minimal sale label.
 * A tilted rounded price-tag silhouette with a punched string hole and a
 * subtle accent spark suggesting a great deal / trade.
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
      <g transform="rotate(-18 20 20)">
        {/* Sale label body — rounded rectangle with angled tip on the left */}
        <path
          d="M14 6 L33 6 A3 3 0 0 1 36 9 V31 A3 3 0 0 1 33 34 H14 A3 3 0 0 1 11.6 32.8 L4.9 22.8 A3 3 0 0 1 4.9 17.2 L11.6 7.2 A3 3 0 0 1 14 6 Z"
          fill={color}
        />
        {/* String hole */}
        <circle cx="12.2" cy="20" r="2.6" fill="var(--color-background)" />
        {/* Accent spark — deal dot */}
        <circle cx="28" cy="20" r="2.4" fill={dotColor} />
      </g>
    </svg>
  );
}
