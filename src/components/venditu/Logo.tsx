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
      {/* Two interlocking chevrons forming a V — symbolizing exchange */}
      <path
        d="M6 10 L20 32 L20 24 L11 10 Z"
        fill={color}
      />
      <path
        d="M34 10 L20 32 L20 24 L29 10 Z"
        fill={color}
        opacity="0.72"
      />
    </svg>
  );
}
