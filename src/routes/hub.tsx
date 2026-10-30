import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FUTURES } from "@/lib/futures";

export const Route = createFileRoute("/hub")({
  head: () => ({ meta: [{ title: "Future Walk Hub · FutureWalk" }] }),
  component: HubPage,
});

function HubPage() {
  return (
    <AppShell title="03 · Hub">
      <div className="text-center animate-fade-up">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">The Hallway</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">
          Pick a door. <span className="text-gradient">Step into a future.</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          You can always come back. Walk as many futures as you want.
        </p>
      </div>

      <div className="relative mt-14 [perspective:1600px]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-center gap-4 sm:gap-6 [transform-style:preserve-3d] [transform:rotateX(6deg)]">
          {FUTURES.map((f, i) => (
            <Link
              key={f.id}
              to="/future/$id"
              params={{ id: f.id }}
              className="group relative w-[42%] sm:w-[26%] md:w-[18%] aspect-[2/5] rounded-t-[44px] glass-strong overflow-hidden animate-fade-up hover:scale-105 transition-transform"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-violet)]/20 via-transparent to-[var(--neon-cyan)]/30 opacity-70 group-hover:opacity-100 transition" />
              <div className="absolute inset-x-0 top-[18%] text-center text-5xl drop-shadow">{f.emoji}</div>
              <div className="absolute inset-x-3 top-[55%] h-px bg-white/20" />
              <div className="absolute inset-x-0 top-[58%] text-center text-xs sm:text-sm font-semibold px-2">
                {f.title}
              </div>
              <div className="absolute inset-x-6 top-[70%] h-1.5 rounded-full bg-white/40 animate-pulse" />
              <div className="absolute bottom-3 inset-x-0 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
                Enter →
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_50%_40%,oklch(0.85_0.18_200/0.35),transparent_60%)]" />
            </Link>
          ))}
        </div>

        <div className="absolute -bottom-10 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      <div className="mt-16 flex flex-wrap justify-center gap-3">
        <Link to="/dashboard" className="btn-ghost">← Back to analysis</Link>
        <Link to="/compare" className="btn-ghost">Compare futures</Link>
        <Link to="/roadmap" className="btn-neon btn-neon-hover">My roadmap</Link>
      </div>
    </AppShell>
  );
}
