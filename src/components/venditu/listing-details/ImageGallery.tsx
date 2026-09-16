import { useState } from "react";
import { ImageOff } from "lucide-react";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="grid aspect-[4/3] w-full place-items-center rounded-2xl border border-dashed border-border bg-secondary text-muted-foreground">
        <div className="text-center">
          <ImageOff className="mx-auto mb-2 h-7 w-7" />
          <p className="text-sm font-medium">No photos for this listing</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
        <img
          src={images[Math.min(active, images.length - 1)]}
          alt={title}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              className={`overflow-hidden rounded-xl border transition-all ${
                i === active
                  ? "border-primary ring-2 ring-primary/25"
                  : "border-border opacity-80 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
