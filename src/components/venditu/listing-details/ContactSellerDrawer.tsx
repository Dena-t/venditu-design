import { useState } from "react";
import { X, Send } from "lucide-react";

export function ContactSellerDrawer({
  open,
  seller,
  onClose,
}: {
  open: boolean;
  seller: string;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" onClick={onClose} />
      <aside
        role="dialog"
        aria-label="Contact seller"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card shadow-xl sm:rounded-l-3xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <h2 className="text-lg font-semibold">Contact Seller</h2>
            <p className="mt-1 text-sm text-muted-foreground">@{seller}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <label htmlFor="contact-message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="contact-message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            placeholder="Hi! Is this still available?"
            className="mt-2 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm outline-none transition-colors focus:border-primary"
          />
          {notice && <p className="mt-3 text-sm text-muted-foreground">{notice}</p>}
        </div>

        <footer className="border-t border-border p-6">
          <button
            onClick={() => setNotice("Messaging will be available soon.")}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Send className="h-4 w-4" /> Send message
          </button>
        </footer>
      </aside>
    </div>
  );
}
