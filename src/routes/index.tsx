import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { FUTURES } from "@/lib/futures";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FutureWalk — Don't Just Choose Your Future, Walk Through It." },
      {
        name: "description",
        content:
          "FutureWalk is an AI-powered future simulation platform. Explore multiple educational and career paths before making life-changing decisions.",
      },
      { property: "og:title", content: "FutureWalk — Experience Tomorrow Before Choosing Today" },
      {
        property: "og:description",
        content:
          "Walk through multiple AI-simulated futures — careers, lifestyles, and outcomes — before you commit to one.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <AppShell>
      <section className="relative pt-10 md:pt-20 pb-16">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-[var(--neon-cyan)]" />
            AI Future Simulation · v0.1
          </div>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black tracking-tight">
            Future<span className="text-gradient">Walk</span>
          </h1>
          <p className="mt-5 text-xl md:text-2xl font-medium text-foreground/90">
            Don't Just Choose Your Future,{" "}
            <span className="text-gradient">Walk Through It.</span>
          </p>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Explore multiple futures before making life-changing educational and career decisions.
            Step inside a parallel life, talk to your future self, and choose with clarity.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/profile" className="btn-neon btn-neon-hover">
              Start Your Future Walk <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="#demo" className="btn-ghost">
              <Play className="h-4 w-4" /> Watch Demo
            </a>
          </div>
        </div>

        {/* Doors hallway preview */}
        <div className="relative mt-16 [perspective:1400px]">
          <div className="mx-auto flex max-w-5xl items-end justify-center gap-3 sm:gap-5 [transform-style:preserve-3d] [transform:rotateX(8deg)]">
            {FUTURES.slice(0, 5).map((f, i) => (
              <div
                key={f.id}
                className="group relative w-[18%] min-w-[90px] aspect-[2/5] rounded-t-[40px] glass-strong overflow-hidden animate-fade-up"
                style={{
                  animationDelay: `${i * 80}ms`,
                  transform: `translateZ(${i === 2 ? 30 : 0}px) rotateY(${(i - 2) * 6}deg)`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-violet)]/30 via-transparent to-[var(--neon-cyan)]/30 opacity-60 group-hover:opacity-100 transition" />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-4xl">
                  {f.emoji}
                </div>
                <div className="absolute bottom-3 inset-x-0 text-center text-[10px] sm:text-xs font-medium tracking-wide">
                  {f.title}
                </div>
                <div className="absolute inset-x-6 top-1/3 h-1.5 rounded-full bg-white/40 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="absolute inset-x-0 -bottom-10 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
      </section>

      <section id="demo" className="grid gap-4 md:grid-cols-3 mt-16">
        {[
          { t: "Simulate", d: "Run a vivid day-in-the-life across multiple careers." },
          { t: "Compare", d: "Place futures side-by-side across 8+ parameters." },
          { t: "Decide", d: "Talk to your future self. Then make the call." },
        ].map((c, i) => (
          <div
            key={c.t}
            className="glass rounded-2xl p-6 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--neon-cyan)]">
              0{i + 1}
            </div>
            <div className="mt-2 text-xl font-bold">{c.t}</div>
            <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <div className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Quick navigation · all 10 modules
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            { to: "/profile", label: "Profile Setup" },
            { to: "/dashboard", label: "AI Analysis" },
            { to: "/hub", label: "Future Hub" },
            { to: "/compare", label: "Compare" },
            { to: "/parents", label: "For Parents" },
            { to: "/simulate", label: "Job Simulation" },
            { to: "/roadmap", label: "Roadmap" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="btn-ghost !py-1.5 !px-3 text-xs">
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
