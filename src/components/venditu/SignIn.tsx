import { useState } from "react";
import { AtSign, Lock, LogIn } from "lucide-react";
import { VenditutMark } from "./Logo";

export function SignIn() {
  const [form, setForm] = useState({ username: "", password: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <a href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <VenditutMark className="h-10 w-10" />
          <span className="text-xl font-semibold tracking-tight text-foreground">Venditu</span>
        </a>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to Venditu.</p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("sign in", form);
            }}
          >
            <Field
              label="Username"
              icon={<AtSign className="h-4 w-4" />}
              value={form.username}
              onChange={update("username")}
              placeholder="janedoe"
              autoComplete="username"
            />
            <Field
              label="Password"
              type="password"
              icon={<Lock className="h-4 w-4" />}
              value={form.password}
              onChange={update("password")}
              placeholder="••••••••"
              autoComplete="current-password"
            />

            <button
              type="submit"
              className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <LogIn className="h-4 w-4" /> Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New to Venditu?{" "}
            <a href="/signup" className="font-medium text-primary hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          {...props}
          className="h-11 w-full rounded-full border border-border bg-secondary/40 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary/10"
        />
      </span>
    </label>
  );
}
