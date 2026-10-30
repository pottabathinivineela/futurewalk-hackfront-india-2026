import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useState } from "react";
import { Building2, Briefcase, Play } from "lucide-react";

export const Route = createFileRoute("/simulate")({
  head: () => ({ meta: [{ title: "Job Simulation · FutureWalk" }] }),
  component: SimulatePage,
});

const COMPANIES = [
  { id: "google", name: "Google", emoji: "🔵" },
  { id: "microsoft", name: "Microsoft", emoji: "🟦" },
  { id: "tesla", name: "Tesla", emoji: "⚡" },
  { id: "isro", name: "ISRO", emoji: "🛰️" },
  { id: "nasa", name: "NASA", emoji: "🚀" },
  { id: "startup", name: "Startup Founder", emoji: "🌱" },
];
const ROLES = [
  { id: "swe", name: "Software Engineer" },
  { id: "pm", name: "Product Manager" },
  { id: "ds", name: "Data Scientist" },
  { id: "ai", name: "AI Engineer" },
];

function SimulatePage() {
  const [company, setCompany] = useState(COMPANIES[0]);
  const [role, setRole] = useState(ROLES[0]);
  const [started, setStarted] = useState(false);

  const day = [
    { t: "08:30", e: "Standup with a team scattered across 3 timezones." },
    { t: "10:00", e: `Deep work block: prototype a new ${role.name.toLowerCase()} project.` },
    { t: "12:30", e: "Lunch with a senior — they share a career-shifting story." },
    { t: "14:00", e: `Cross-team review at ${company.name}.` },
    { t: "16:00", e: "Ship something to production. Get instant feedback." },
    { t: "18:30", e: "Wrap up. Write tomorrow's top 3 in a notebook." },
  ];

  return (
    <AppShell title="08 · Simulation">
      <div className="animate-fade-up">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">Job Simulation Mode</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-bold">
          Try the role <span className="text-gradient">before you prepare for it</span>.
        </h1>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-violet)] flex items-center gap-2">
            <Building2 className="h-3 w-3" /> Dream Company
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {COMPANIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCompany(c)}
                className={`rounded-xl px-3 py-3 text-sm transition border ${
                  company.id === c.id
                    ? "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] text-[var(--primary-foreground)] border-transparent"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="text-xl">{c.emoji}</div>
                <div className="mt-1">{c.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-pink)] flex items-center gap-2">
            <Briefcase className="h-3 w-3" /> Dream Role
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {ROLES.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r)}
                className={`rounded-xl px-3 py-3 text-sm transition border text-left ${
                  role.id === r.id
                    ? "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] text-[var(--primary-foreground)] border-transparent"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => setStarted(true)} className="btn-neon btn-neon-hover mt-6">
        <Play className="h-4 w-4" /> Start Simulation
      </button>

      {started && (
        <div className="mt-10 animate-fade-up">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">
              A day as a {role.name} at {company.name}
            </div>
            <h2 className="mt-2 text-2xl font-bold">{company.emoji} {company.name}</h2>
          </div>

          <ol className="relative mt-8 max-w-2xl mx-auto border-l-2 border-white/10 pl-6 space-y-5">
            {day.map((d, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[34px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-violet)] shadow-[0_0_12px_var(--neon-cyan)]" />
                <div className="font-mono text-xs text-[var(--neon-cyan)]">{d.t}</div>
                <div className="mt-1 text-sm">{d.e}</div>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { t: "Team Collaboration", b: "Cross-functional, mostly async, mostly written." },
              { t: "Projects", b: `Quarterly ${role.name.toLowerCase()} initiatives with real impact.` },
              { t: "Career Growth", b: `Promo cycle ~ every 2 years if you ship and grow scope.` },
            ].map((c) => (
              <div key={c.t} className="glass rounded-2xl p-5">
                <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-violet)]">{c.t}</div>
                <p className="mt-2 text-sm text-foreground/90">{c.b}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <Link to="/roadmap" className="btn-neon btn-neon-hover">Get my prep roadmap</Link>
            <Link to="/hub" className="btn-ghost">Try another door</Link>
          </div>
        </div>
      )}
    </AppShell>
  );
}
