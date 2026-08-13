import { Heart } from "lucide-react";
import { useState } from "react";

export function FavoriteButton({ label = "Save listing" }: { label?: string }) {
  const [fav, setFav] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={fav}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setFav((v) => !v);
      }}
      className="grid h-9 w-9 place-items-center rounded-full bg-background/95 shadow-sm backdrop-blur transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <Heart
        className={`h-4 w-4 transition-all duration-200 ${
          fav ? "scale-110 fill-destructive text-destructive" : "text-foreground"
        }`}
        strokeWidth={2}
      />
    </button>
  );
}
