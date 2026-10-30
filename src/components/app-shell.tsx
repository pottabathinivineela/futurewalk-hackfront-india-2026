import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  const router = useRouter();
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 grid-bg animate-grid-pan opacity-30" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,var(--background)_80%)]" />

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="grid h-9 w-9 place-items-center rounded-xl glass-strong animate-pulse-glow">
            <span className="text-gradient text-lg font-black">F</span>
          </div>
          <div className="font-display text-lg font-bold tracking-tight">
            Future<span className="text-gradient">Walk</span>
          </div>
        </Link>

        {title && (
          <div className="hidden md:block text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {title}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.history.back()}
            className="btn-ghost !px-3 !py-2"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <Link to="/" className="btn-ghost !px-3 !py-2" aria-label="Home">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-5 pb-20">{children}</main>

      <footer className="relative z-10 border-t border-white/5 mt-10">
        <div className="mx-auto max-w-7xl px-5 py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} FutureWalk — Walk through tomorrow.</span>
          <span className="font-mono opacity-70">v0.1 · simulated futures</span>
        </div>
      </footer>
    </div>
  );
}
