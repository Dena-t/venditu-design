import { useState } from "react";
import { ImageOff } from "lucide-react";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const safe = Array.isArray(images) ? images.filter(Boolean) : [];

  if (safe.length === 0) {
    return (
      <div className="grid aspect-[4/3] w-full place-items-center rounded-2xl border border-border bg-secondary text-muted-foreground">
        <div className="flex flex-col items-center gap-2 text-sm">
          <ImageOff className="h-6 w-6" />
          No photos provided
        </div>
      </div>
    );
  }

  const active = safe[Math.min(idx, safe.length - 1)];

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
        <img src={active} alt={title} className="aspect-[4/3] h-full w-full object-cover" />
      </div>

      {safe.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {safe.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIdx(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === idx}
              className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border transition-all ${
                i === idx ? "border-primary ring-2 ring-primary/25" : "border-border opacity-80 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
