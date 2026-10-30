import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FUTURES, loadSaved, toggleSaved } from "@/lib/futures";
import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, BarChart3, DoorOpen } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Future Analysis · FutureWalk" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [saved, setSaved] = useState<string[]>([]);
  useEffect(() => setSaved(loadSaved()), []);

  const top = FUTURES.slice(0, 5);

  return (
    <AppShell title="02 · Analysis">
      <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-up">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">AI Match Engine</div>
          <h1 className="mt-1 text-3xl md:text-4xl font-bold">
            Based on your profile, we found{" "}
            <span className="text-gradient">{top.length} possible futures</span>.
          </h1>
        </div>
        <div className="flex gap-2">
          <Link to="/hub" className="btn-ghost">
            <DoorOpen className="h-4 w-4" /> Future Hub
          </Link>
          <Link to="/compare" className="btn-neon btn-neon-hover">
            <BarChart3 className="h-4 w-4" /> Compare
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {top.map((f, i) => (
          <div
            key={f.id}
            className="group relative glass rounded-2xl p-5 overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[var(--neon-violet)]/20 blur-3xl group-hover:bg-[var(--neon-cyan)]/30 transition" />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="text-4xl">{f.emoji}</div>
                <div className="mt-3 text-xl font-bold">{f.title}</div>
                <div className="text-xs text-muted-foreground">{f.location} · ₹{f.salary.replace("₹", "")}</div>
              </div>
              <button
                onClick={() => setSaved(toggleSaved(f.id))}
                className="rounded-full p-2 hover:bg-white/10 transition"
                aria-label="Save"
              >
                {saved.includes(f.id) ? (
                  <BookmarkCheck className="h-5 w-5 text-[var(--neon-lime)]" />
                ) : (
                  <Bookmark className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>

            <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat label="Match" value={`${f.match}%`} tone="cyan" />
              <Stat label="Growth" value={`${f.growth}`} tone="violet" />
              <Stat label="Demand" value={`${f.demand}`} tone="pink" />
            </div>

            <div className="relative mt-4 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Risk</span>
              <span
                className={`rounded-full px-2 py-0.5 ${
                  f.risk === "Low"
                    ? "bg-[var(--neon-lime)]/20 text-[var(--neon-lime)]"
                    : f.risk === "Medium"
                    ? "bg-yellow-400/15 text-yellow-300"
                    : "bg-red-500/15 text-red-300"
                }`}
              >
                {f.risk}
              </span>
            </div>

            <div className="relative mt-5 flex gap-2">
              <Link
                to="/future/$id"
                params={{ id: f.id }}
                className="btn-neon btn-neon-hover !py-2 !px-4 text-xs flex-1"
              >
                Enter Future
              </Link>
              <Link to="/compare" className="btn-ghost !py-2 !px-3 text-xs">
                Compare
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "cyan" | "violet" | "pink" }) {
  const color =
    tone === "cyan" ? "text-[var(--neon-cyan)]" : tone === "violet" ? "text-[var(--neon-violet)]" : "text-[var(--neon-pink)]";
  return (
    <div className="rounded-xl bg-white/5 py-2">
      <div className={`font-mono text-lg font-bold ${color}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
