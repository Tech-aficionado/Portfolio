"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

const PADS = [
  { key: 0, base: "bg-accent/30", lit: "bg-accent" },
  { key: 1, base: "bg-ink/20", lit: "bg-ink" },
  { key: 2, base: "bg-accent/15", lit: "bg-accent/80" },
  { key: 3, base: "bg-ink/10", lit: "bg-ink/70" },
];

type Phase = "idle" | "showing" | "input" | "over";

export default function Simon(): React.JSX.Element {
  const [seq, setSeq] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [active, setActive] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [best, setBest] = useState(0);
  const inputPos = useRef(0);

  useEffect(() => {
    const stored = localStorage.getItem("simon_best");
    if (stored) setBest(parseInt(stored, 10));
  }, []);

  const playSequence = useCallback((s: number[]) => {
    setPhase("showing");
    let i = 0;
    const tick = () => {
      setActive(s[i]);
      setTimeout(() => setActive(null), 350);
      i++;
      if (i < s.length) {
        setTimeout(tick, 600);
      } else {
        setTimeout(() => {
          setPhase("input");
          inputPos.current = 0;
        }, 600);
      }
    };
    setTimeout(tick, 500);
  }, []);

  const nextRound = useCallback(
    (current: number[]) => {
      const next = [...current, Math.floor(Math.random() * 4)];
      setSeq(next);
      setStep(next.length);
      playSequence(next);
    },
    [playSequence]
  );

  const start = () => {
    setStep(0);
    nextRound([]);
  };

  const press = (key: number) => {
    if (phase !== "input") return;
    setActive(key);
    setTimeout(() => setActive(null), 200);
    if (key === seq[inputPos.current]) {
      inputPos.current++;
      if (inputPos.current === seq.length) {
        setTimeout(() => nextRound(seq), 700);
      }
    } else {
      setBest((prev) => {
        const reached = seq.length - 1;
        const next = Math.max(prev, reached);
        localStorage.setItem("simon_best", String(next));
        return next;
      });
      setPhase("over");
    }
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-6 text-sm text-muted">
        <span>Level <b className="text-accent">{step}</b></span>
        <span>Best <b className="text-ink">{best}</b></span>
      </div>

      <div className="relative mx-auto grid max-w-sm grid-cols-2 gap-3">
        {PADS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => press(p.key)}
            disabled={phase !== "input"}
            className={`aspect-square rounded-2xl border border-line transition-all duration-150 ${
              active === p.key ? p.lit : p.base
            } ${phase === "input" ? "hover:brightness-95 cursor-pointer" : "cursor-default"}`}
            aria-label={`Pad ${p.key + 1}`}
          />
        ))}

        {(phase === "idle" || phase === "over") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-paper/70 backdrop-blur-sm text-center">
            {phase === "over" && (
              <p className="font-display text-2xl">Reached level {seq.length - 1} 🧠</p>
            )}
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-accent transition-colors"
            >
              <Play className="h-4 w-4" /> {phase === "over" ? "Try again" : "Start"}
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        {phase === "showing" ? "Watch the pattern…" : phase === "input" ? "Repeat it!" : "Memorize the growing sequence."}
      </p>
    </div>
  );
}
