import { useRef, useState } from "react";
import { ImagePlus, Star, Trash2, UploadCloud } from "lucide-react";

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
}

export function ImageUploader({
  images,
  onChange,
  max = 8,
}: {
  images: UploadedImage[];
  onChange: (next: UploadedImage[]) => void;
  max?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, max - images.length)
      .map((f) => ({ id: `${f.name}-${f.size}-${Math.random()}`, url: URL.createObjectURL(f), name: f.name }));
    onChange([...images, ...next]);
  };

  const remove = (id: string) => onChange(images.filter((i) => i.id !== id));
  const makeCover = (id: string) => {
    const img = images.find((i) => i.id === id);
    if (!img) return;
    onChange([img, ...images.filter((i) => i.id !== id)]);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
          dragging ? "border-primary/50 bg-primary/5" : "border-border bg-secondary/40"
        }`}
      >
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-background text-primary shadow-sm">
          <UploadCloud className="h-5 w-5" />
        </span>
        <p className="mt-3 text-sm font-semibold text-foreground">Drag & drop photos here</p>
        <p className="mt-1 text-xs text-muted-foreground">
          PNG or JPG, up to {max} images. The first image is used as the cover.
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={images.length >= max}
          className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:opacity-50"
        >
          <ImagePlus className="h-4 w-4" /> Choose files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-label="Upload listing images"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {images.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, i) => (
            <li
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary"
            >
              <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-foreground/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-background">
                  Cover
                </span>
              )}
              <div className="absolute inset-x-2 bottom-2 flex justify-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeCover(img.id)}
                    aria-label={`Set ${img.name} as cover`}
                    className="grid h-8 w-8 place-items-center rounded-full bg-background/95 shadow-sm transition-transform hover:scale-105"
                  >
                    <Star className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(img.id)}
                  aria-label={`Remove ${img.name}`}
                  className="grid h-8 w-8 place-items-center rounded-full bg-background/95 text-destructive shadow-sm transition-transform hover:scale-105"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
