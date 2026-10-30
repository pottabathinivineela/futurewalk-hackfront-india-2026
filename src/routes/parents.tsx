import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FUTURES, loadProfile } from "@/lib/futures";
import { useEffect, useState } from "react";
import { Heart, TrendingUp, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/parents")({
  head: () => ({ meta: [{ title: "Parent Convince Mode · FutureWalk" }] }),
  component: ParentsPage,
});

function ParentsPage() {
  const [showSlideshow, setShow] = useState(false);
  const [name, setName] = useState("your child");
  useEffect(() => {
    const p = loadProfile();
    if (p.name) setName(p.name);
  }, []);

  return (
    <AppShell title="07 · Parents">
      <div className="animate-fade-up">
        <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-pink)] flex items-center gap-2">
          <Heart className="h-3 w-3" /> For Parents
        </div>
        <h1 className="mt-1 text-3xl md:text-4xl font-bold">
          Understand {name}'s future <span className="text-gradient">before they live it</span>.
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          A clear, data-backed view of where these career paths actually lead — growth, demand,
          income, and the support {name} will need.
        </p>
      </div>

      {/* Big CTA */}
      <button
        onClick={() => setShow(true)}
        className="btn-neon btn-neon-hover mt-6"
      >
        Experience {name}'s Future
      </button>

      {/* Career growth graphs */}
      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {FUTURES.slice(0, 4).map((f) => (
          <div key={f.id} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{f.emoji}</div>
                <div>
                  <div className="font-bold">{f.title}</div>
                  <div className="text-xs text-muted-foreground">Industry demand & salary trend</div>
                </div>
              </div>
              <TrendingUp className="h-5 w-5 text-[var(--neon-lime)]" />
            </div>
            <MiniChart seed={f.id} />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <Pill label="Growth" value={`${f.growth}`} />
              <Pill label="Demand" value={`${f.demand}`} />
              <Pill label="Salary" value={f.salary} />
            </div>
          </div>
        ))}
      </section>

      {/* Stories + scholarships */}
      <section className="mt-8 grid gap-5 md:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <GraduationCap className="h-5 w-5 text-[var(--neon-cyan)]" />
          <div className="mt-2 font-bold">Success Stories</div>
          <ul className="mt-2 text-sm text-muted-foreground space-y-1">
            <li>• A small-town engineer who now leads ISRO mission control.</li>
            <li>• A first-gen graduate building a healthtech startup.</li>
            <li>• A doctor running rural telemedicine for 12 villages.</li>
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="text-[var(--neon-violet)] font-mono text-xs uppercase tracking-widest">Scholarships</div>
          <ul className="mt-2 text-sm space-y-1">
            <li>• Inspire Scholarship (DST)</li>
            <li>• KVPY / NTSE legacy programs</li>
            <li>• Reliance Foundation UG/PG</li>
            <li>• Tata Trusts merit grants</li>
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="text-[var(--neon-pink)] font-mono text-xs uppercase tracking-widest">Roadmap</div>
          <ol className="mt-2 text-sm space-y-1 list-decimal list-inside">
            <li>Pick 1–2 futures together</li>
            <li>Plan the next 12 months</li>
            <li>Support skill-building & internships</li>
            <li>Review every 6 months</li>
          </ol>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/hub" className="btn-ghost">Explore Future Hub</Link>
        <Link to="/compare" className="btn-ghost">Compare careers</Link>
      </div>

      {/* Slideshow modal */}
      {showSlideshow && <Slideshow name={name} onClose={() => setShow(false)} />}
    </AppShell>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/5 py-1.5">
      <div className="font-mono text-sm">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function MiniChart({ seed }: { seed: string }) {
  // deterministic-ish points from string
  const pts = Array.from({ length: 12 }, (_, i) => {
    const s = seed.charCodeAt((i + 1) % seed.length);
    return 30 + ((s * (i + 1)) % 55);
  });
  const max = Math.max(...pts);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 100} ${100 - (p / max) * 90}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" className="mt-4 h-32 w-full">
      <defs>
        <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.85 0.18 200)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.7 0.22 290)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L 100 100 L 0 100 Z`} fill={`url(#g-${seed})`} />
      <path d={d} fill="none" stroke="oklch(0.85 0.18 200)" strokeWidth="1.5" />
    </svg>
  );
}

function Slideshow({ name, onClose }: { name: string; onClose: () => void }) {
  const slides = [
    { t: "Year 1", b: `${name} starts building real skills — not just grades.` },
    { t: "Year 3", b: `First internship. First paycheck. Confidence compounds.` },
    { t: "Year 5", b: `A respected role at a great company — or their own venture.` },
    { t: "Year 10", b: `Financial stability, meaningful work, and a life with options.` },
  ];
  const [i, setI] = useState(0);
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md grid place-items-center p-5 animate-fade-up">
      <div className="glass-strong rounded-3xl p-8 max-w-xl w-full text-center neon-border">
        <div className="text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)]">{slides[i].t}</div>
        <p className="mt-4 text-2xl font-bold">{slides[i].b}</p>
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, k) => (
            <div key={k} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-[var(--neon-cyan)]" : "w-2 bg-white/20"}`} />
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {i > 0 && (
            <button onClick={() => setI(i - 1)} className="btn-ghost">Back</button>
          )}
          {i < slides.length - 1 ? (
            <button onClick={() => setI(i + 1)} className="btn-neon btn-neon-hover">Next →</button>
          ) : (
            <button onClick={onClose} className="btn-neon btn-neon-hover">Finish</button>
          )}
        </div>
      </div>
    </div>
  );
}
