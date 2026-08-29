import { AlertTriangle } from "lucide-react";

export function DeleteListingDialog({
  title,
  onCancel,
  onConfirm,
}: {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" onClick={onCancel} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Delete listing"
        className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="grid h-11 w-11 place-items-center rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-lg font-semibold">Delete listing?</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          This action cannot be undone. <span className="font-medium text-foreground">{title}</span>{" "}
          will be permanently removed.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            className="h-11 rounded-xl border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="h-11 rounded-xl bg-destructive px-5 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
          >
            Delete Listing
          </button>
        </div>
      </div>
    </div>
  );
}
