import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FUTURES, type Future } from "@/lib/futures";
import { useState } from "react";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "Compare Futures · FutureWalk" }] }),
  component: ComparePage,
});

const PARAMS: { key: keyof Future["parameters"]; label: string }[] = [
  { key: "salary", label: "Salary" },
  { key: "growth", label: "Growth" },
  { key: "security", label: "Job Security" },
  { key: "stress", label: "Stress" },
  { key: "balance", label: "Work-Life Balance" },
  { key: "creativity", label: "Creativity" },
  { key: "learning", label: "Learning Opportunities" },
  { key: "entrepreneurship", label: "Entrepreneurship Potential" },
];

function ComparePage() {
  const [selected, setSelected] = useState<string[]>(["software-engineer", "aeronautical-engineer", "entrepreneur"]);

  const toggle = (id: string) => {
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : cur.length < 3 ? [...cur, id] : [cur[1], cur[2], id],
    );
  };

  const chosen = selected.map((id) => FUTURES.find((f) => f.id === id)!).filter(Boolean);

  return (
    <AppShell title="05 · Compare">
      <div className="animate-fade-up">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">Side-by-side</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-bold">
          Compare <span className="text-gradient">up to 3 futures</span>
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">Tap to add or swap futures.</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FUTURES.map((f) => {
          const on = selected.includes(f.id);
          return (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              className={`rounded-full px-4 py-2 text-sm transition border ${
                on
                  ? "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] text-[var(--primary-foreground)] border-transparent"
                  : "border-white/10 hover:border-white/30 text-foreground/80"
              }`}
            >
              {f.emoji} {f.title}
            </button>
          );
        })}
      </div>

      <div className="mt-8 overflow-x-auto glass rounded-2xl">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-4 text-xs uppercase tracking-widest text-muted-foreground">Parameter</th>
              {chosen.map((f) => (
                <th key={f.id} className="p-4">
                  <div className="text-2xl">{f.emoji}</div>
                  <div className="text-sm font-semibold">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.salary}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PARAMS.map((p) => (
              <tr key={p.key} className="border-t border-white/5">
                <td className="p-4 text-muted-foreground">{p.label}</td>
                {chosen.map((f) => {
                  const v = f.parameters[p.key];
                  return (
                    <td key={f.id} className="p-4 min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)]"
                            style={{ width: `${v}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs w-8 text-right">{v}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
