import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FUTURES, getFuture, loadSaved } from "@/lib/futures";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Personalized Roadmap · FutureWalk" }] }),
  component: RoadmapPage,
});

function RoadmapPage() {
  const [selected, setSelected] = useState<string>(FUTURES[0].id);
  useEffect(() => {
    const s = loadSaved();
    if (s[0]) setSelected(s[0]);
  }, []);
  const f = useMemo(() => getFuture(selected)!, [selected]);

  return (
    <AppShell title="09 · Roadmap">
      <div className="animate-fade-up">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">Personalized Roadmap</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-bold">
          Your path to becoming a <span className="text-gradient">{f.title}</span>
        </h1>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {FUTURES.map((x) => (
          <button
            key={x.id}
            onClick={() => setSelected(x.id)}
            className={`rounded-full px-3 py-1.5 text-xs transition border ${
              x.id === selected
                ? "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] text-[var(--primary-foreground)] border-transparent"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            {x.emoji} {x.title}
          </button>
        ))}
      </div>

      {/* Stage bar */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {["Current Stage", "Intermediate Goals", "Final Career Goal"].map((s, i) => (
          <div
            key={s}
            className="relative glass rounded-2xl p-5 overflow-hidden"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">Stage 0{i + 1}</div>
            <div className="mt-1 font-semibold">{s}</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)]"
                style={{ width: `${(i + 1) * 33}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Block title="Skills to Learn" items={f.roadmap.skills} tone="cyan" />
        <Block title="Certifications" items={f.roadmap.certifications} tone="violet" />
        <Block title="Projects" items={f.roadmap.projects} tone="pink" />
        <Block title="Internships" items={f.roadmap.internships} tone="lime" />
      </div>

      <section className="mt-8 glass rounded-2xl p-6">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)] mb-5">Milestone Timeline</div>
        <div className="relative">
          <div className="absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-violet)] to-[var(--neon-pink)]" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {f.roadmap.milestones.map((m, i) => (
              <div key={i} className="relative pt-10 text-center">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-5 rounded-full bg-background border-2 border-[var(--neon-cyan)] shadow-[0_0_12px_var(--neon-cyan)]" />
                <div className="font-mono text-xs text-[var(--neon-cyan)]">{m.year}</div>
                <div className="text-sm mt-1">{m.goal}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/hub" className="btn-ghost">Explore other futures</Link>
        <Link to="/parents" className="btn-ghost">Share with parents</Link>
        <Link to="/simulate" className="btn-neon btn-neon-hover">Try a job simulation</Link>
      </div>
    </AppShell>
  );
}

function Block({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "cyan" | "violet" | "pink" | "lime";
}) {
  const map = {
    cyan: "text-[var(--neon-cyan)]",
    violet: "text-[var(--neon-violet)]",
    pink: "text-[var(--neon-pink)]",
    lime: "text-[var(--neon-lime)]",
  };
  return (
    <div className="glass rounded-2xl p-5">
      <div className={`text-xs uppercase tracking-[0.25em] ${map[tone]}`}>{title}</div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`mt-1 h-1.5 w-1.5 rounded-full bg-current shrink-0 ${map[tone]}`} />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
