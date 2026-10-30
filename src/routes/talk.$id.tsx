import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { getFuture, loadProfile } from "@/lib/futures";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/talk/$id")({
  head: ({ params }) => {
    const f = getFuture(params.id);
    return { meta: [{ title: f ? `Future Self · ${f.title}` : "Future Self · FutureWalk" }] };
  },
  loader: ({ params }) => {
    if (!getFuture(params.id)) throw notFound();
    return null;
  },
  component: TalkPage,
});

type Msg = { role: "user" | "self"; text: string };

const QUICK = [
  "What challenges did you face?",
  "Was this career worth it?",
  "What should I start learning now?",
];

function answer(question: string, title: string, name: string): string {
  const q = question.toLowerCase();
  if (q.includes("challenge"))
    return `Honestly ${name}? The first three years as a ${title} were the hardest. Imposter syndrome, long hours, and constant relearning. The trick was building a small circle of people who pushed me — and learning to switch off at night.`;
  if (q.includes("worth"))
    return `Yes — but not for the reasons you'd expect at 18. The money matters less than waking up curious. Being a ${title} stayed interesting because every year the work changed shape.`;
  if (q.includes("learn") || q.includes("start"))
    return `Start small and ship. Pick one foundational skill for ${title}, build one tiny project this month, and write about what you learned. Compound interest works on careers too.`;
  if (q.includes("regret"))
    return `One regret: I waited too long to ask for help. People want to mentor you — let them.`;
  if (q.includes("salary") || q.includes("money"))
    return `Money came eventually. The ones who chased it first burned out. The ones who got obsessed with the craft earned more and slept better.`;
  return `As a ${title}, what I wish I knew at your age: your taste improves faster than your ability. That gap is where most people quit. Don't. Keep going — your future self will thank you.`;
}

function TalkPage() {
  const { id } = Route.useParams();
  const f = getFuture(id)!;
  const [name, setName] = useState("there");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = loadProfile();
    const n = p.name || "there";
    setName(n);
    setMsgs([
      {
        role: "self",
        text: `Hi ${n}. I'm your future self — the one who chose ${f.title}. I'm ${f.ageSnapshot} now, working in ${f.location}. Ask me anything.`,
      },
    ]);
  }, [f.title, f.ageSnapshot, f.location]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMsgs((m) => [...m, { role: "user", text: clean }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "self", text: answer(clean, f.title, name) }]);
    }, 700);
  };

  return (
    <AppShell title={`06 · Future Self`}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-4 animate-fade-up">
          <div className="grid h-16 w-16 place-items-center rounded-2xl glass-strong animate-pulse-glow text-3xl">
            {f.emoji}
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)]">Future {name}</div>
            <h1 className="text-2xl font-bold">{f.title} · age {f.ageSnapshot}</h1>
            <p className="text-xs text-muted-foreground">Simulated AI avatar — answers are illustrative.</p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-6 glass rounded-2xl p-4 h-[420px] overflow-y-auto space-y-3"
        >
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-up`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-violet)] text-[var(--primary-foreground)]"
                    : "bg-white/5 border border-white/10 text-foreground"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK.map((q) => (
            <button key={q} onClick={() => send(q)} className="btn-ghost !py-2 !px-3 text-xs">
              {q}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your future self…"
            className="flex-1 rounded-full bg-[var(--input)] border border-white/10 px-5 py-3 text-sm outline-none focus:border-[var(--neon-cyan)]"
          />
          <button type="submit" className="btn-neon btn-neon-hover">
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/future/$id" params={{ id: f.id }} className="btn-ghost">← Back to future</Link>
          <Link to="/hub" className="btn-ghost">Try another door</Link>
        </div>
      </div>
    </AppShell>
  );
}
