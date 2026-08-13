import { Package } from "lucide-react";

export function QuantityDisplay({ quantity }: { quantity: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Package className="h-3.5 w-3.5" />
      {quantity} available
    </span>
  );
}
