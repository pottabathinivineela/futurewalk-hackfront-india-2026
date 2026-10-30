import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useEffect, useState } from "react";
import { defaultProfile, loadProfile, saveProfile, type Profile } from "@/lib/futures";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile Setup · FutureWalk" }] }),
  component: ProfilePage,
});

const SKILLS = ["Coding", "Communication", "Leadership", "Design", "Problem Solving"];
const INTERESTS = ["Technology", "Aviation", "Medicine", "Business", "Research", "Arts"];
const GOALS = ["High Salary", "Entrepreneurship", "Job Security", "Innovation", "Work-Life Balance"];
const LIFESTYLE = ["Corporate", "Startup", "Remote Work", "Government Sector"];

function ProfilePage() {
  const navigate = useNavigate();
  const [p, setP] = useState<Profile>(defaultProfile);

  useEffect(() => setP(loadProfile()), []);

  const toggle = (key: keyof Profile, v: string) => {
    setP((prev) => {
      const arr = prev[key] as string[];
      const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      return { ...prev, [key]: next };
    });
  };

  const submit = () => {
    saveProfile(p);
    navigate({ to: "/dashboard" });
  };

  return (
    <AppShell title="01 · Profile">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold animate-fade-up">
          Tell us about <span className="text-gradient">you</span>.
        </h1>
        <p className="mt-2 text-muted-foreground animate-fade-up">
          Our AI uses this to render futures that actually feel like yours.
        </p>

        <div className="mt-8 space-y-6">
          <Section title="Personal Details">
            <Field label="Name">
              <input
                className="fw-input"
                value={p.name}
                onChange={(e) => setP({ ...p, name: e.target.value })}
                placeholder="e.g. Vineela"
              />
            </Field>
            <Field label="Age">
              <input
                className="fw-input"
                value={p.age}
                onChange={(e) => setP({ ...p, age: e.target.value })}
                placeholder="18"
                inputMode="numeric"
              />
            </Field>
            <Field label="Education Level">
              <select
                className="fw-input"
                value={p.education}
                onChange={(e) => setP({ ...p, education: e.target.value })}
              >
                <option value="">Select…</option>
                {["High School", "Intermediate", "Undergraduate", "Postgraduate"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
          </Section>

          <Section title="Academic Information">
            <Field label="Marks / CGPA">
              <input
                className="fw-input"
                value={p.marks}
                onChange={(e) => setP({ ...p, marks: e.target.value })}
                placeholder="e.g. 9.2 CGPA"
              />
            </Field>
            <Field label="Stream">
              <select
                className="fw-input"
                value={p.stream}
                onChange={(e) => setP({ ...p, stream: e.target.value })}
              >
                <option value="">Select…</option>
                {["Science", "Commerce", "Arts", "Engineering", "Medical"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </Field>
          </Section>

          <Chips title="Skills" values={SKILLS} selected={p.skills} onToggle={(v) => toggle("skills", v)} />
          <Chips title="Interests" values={INTERESTS} selected={p.interests} onToggle={(v) => toggle("interests", v)} />
          <Chips title="Goals" values={GOALS} selected={p.goals} onToggle={(v) => toggle("goals", v)} />
          <Chips title="Preferred Lifestyle" values={LIFESTYLE} selected={p.lifestyle} onToggle={(v) => toggle("lifestyle", v)} />

          <button onClick={submit} className="btn-neon btn-neon-hover w-full mt-4">
            <Sparkles className="h-4 w-4" /> Generate My Futures
          </button>
        </div>
      </div>

      <style>{`
        .fw-input {
          width: 100%;
          padding: 0.7rem 1rem;
          border-radius: 0.85rem;
          background: var(--input);
          border: 1px solid var(--border);
          color: var(--foreground);
          font-size: 0.95rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .fw-input:focus {
          border-color: var(--neon-cyan);
          box-shadow: 0 0 0 3px oklch(0.78 0.18 200 / 0.2);
        }
      `}</style>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-5 md:p-6 animate-fade-up">
      <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)] mb-4">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Chips({
  title,
  values,
  selected,
  onToggle,
}: {
  title: string;
  values: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="glass rounded-2xl p-5 md:p-6 animate-fade-up">
      <h3 className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)] mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => {
          const on = selected.includes(v);
          return (
            <button
              key={v}
              onClick={() => onToggle(v)}
              className={`rounded-full px-4 py-2 text-sm transition border ${
                on
                  ? "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-violet)] text-[var(--primary-foreground)] border-transparent shadow-lg"
                  : "border-white/10 hover:border-white/30 text-foreground/80"
              }`}
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
}
