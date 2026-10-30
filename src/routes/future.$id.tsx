import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { getFuture, loadProfile } from "@/lib/futures";
import { ArrowRight, MessageSquare, Rows3, DoorOpen } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/future/$id")({
  head: ({ params }) => {
    const f = getFuture(params.id);
    return { meta: [{ title: f ? `${f.title} · FutureWalk` : "Future · FutureWalk" }] };
  },
  loader: ({ params }) => {
    const f = getFuture(params.id);
    if (!f) throw notFound();
    return { future: f };
  },
  component: FuturePage,
  notFoundComponent: () => (
    <AppShell>
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">This future doesn't exist (yet).</h1>
        <Link to="/hub" className="btn-neon btn-neon-hover mt-6 inline-flex">Back to hub</Link>
      </div>
    </AppShell>
  ),
});

function FuturePage() {
  const { id } = Route.useParams();
  const f = getFuture(id)!;
  const [name, setName] = useState("You");
  useEffect(() => {
    const p = loadProfile();
    if (p.name) setName(p.name);
  }, []);

  return (
    <AppShell title={`04 · ${f.title}`}>
      {/* Identity card */}
      <section className="relative neon-border rounded-3xl p-6 md:p-8 animate-fade-up overflow-hidden">
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-[var(--neon-violet)]/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[var(--neon-cyan)]/20 blur-3xl" />
        <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="text-7xl animate-float">{f.emoji}</div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">Future Identity</div>
            <h1 className="mt-1 text-3xl md:text-4xl font-black">
              You are <span className="text-gradient">{f.ageSnapshot}</span>.
            </h1>
            <p className="mt-2 text-lg">
              <span className="text-muted-foreground">Career:</span>{" "}
              <span className="font-semibold">{f.title}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {f.location} · {f.salary}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/talk/$id" params={{ id: f.id }} className="btn-neon btn-neon-hover">
              <MessageSquare className="h-4 w-4" /> Talk to Future Self
            </Link>
            <Link to="/compare" className="btn-ghost">
              <Rows3 className="h-4 w-4" /> Compare
            </Link>
          </div>
        </div>
      </section>

      {/* Detail grid */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Card title="Work Environment">{f.environment}</Card>

        <List title="Daily Activities" items={f.daily} tone="cyan" />
        <List title="Future Opportunities" items={f.opportunities} tone="violet" />
        <List title="Challenges" items={f.challenges} tone="pink" />
        <List title="Required Skills" items={f.skills} tone="lime" />
      </div>

      {/* Timeline */}
      <section className="mt-8 glass rounded-2xl p-6 animate-fade-up">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)] mb-4">
          Your Journey · {name}'s timeline
        </div>
        <ol className="relative grid gap-4 md:grid-cols-4">
          {f.roadmap.milestones.map((m, i) => (
            <li key={i} className="relative rounded-xl bg-white/5 p-4">
              <div className="text-xs font-mono text-[var(--neon-cyan)]">{m.year}</div>
              <div className="mt-1 text-sm font-medium">{m.goal}</div>
              <div className="absolute -bottom-1 left-4 right-4 h-px bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] opacity-30" />
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/roadmap" className="btn-neon btn-neon-hover">
          Continue Future Journey <ArrowRight className="h-4 w-4" />
        </Link>
        <Link to="/talk/$id" params={{ id: f.id }} className="btn-ghost">
          <MessageSquare className="h-4 w-4" /> Talk to Future Self
        </Link>
        <Link to="/compare" className="btn-ghost">
          <Rows3 className="h-4 w-4" /> Compare With Another
        </Link>
        <Link to="/hub" className="btn-ghost">
          <DoorOpen className="h-4 w-4" /> Return to Hub
        </Link>
      </div>
    </AppShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5 animate-fade-up">
      <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}

function List({
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
    <div className="glass rounded-2xl p-5 animate-fade-up">
      <div className={`text-xs uppercase tracking-[0.25em] ${map[tone]}`}>{title}</div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`mt-1 h-1.5 w-1.5 rounded-full ${map[tone]} bg-current shrink-0`} />
            <span className="text-foreground/90">{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
