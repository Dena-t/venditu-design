import { useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export function MessageSeller({ seller }: { seller: string }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true);
          setSent(false);
        }}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 text-sm font-semibold transition-colors hover:bg-secondary"
      >
        <MessageSquare className="h-4 w-4" /> Send a Message to Seller
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-sm font-semibold">Message {seller}</p>
      {sent ? (
        <p className="mt-3 inline-flex items-center gap-2 text-sm text-success">
          <CheckCircle2 className="h-4 w-4" /> Message sent
        </p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Hi, is this still available?"
            className="mt-2 w-full resize-y rounded-xl border border-border bg-background p-3 text-sm outline-none transition-colors focus:border-primary"
          />
          <div className="mt-3 flex gap-2.5">
            <button
              disabled={!text.trim()}
              onClick={() => setSent(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setText("");
              }}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
