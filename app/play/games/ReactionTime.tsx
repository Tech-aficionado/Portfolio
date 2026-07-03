"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

type Phase = "idle" | "waiting" | "now" | "result" | "tooSoon";

export default function ReactionTime(): React.JSX.Element {
  const [phase, setPhase] = useState<Phase>("idle");
  const [ms, setMs] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const startRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("reaction_best");
    if (stored) setBest(parseInt(stored, 10));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const arm = () => {
    setPhase("waiting");
    const delay = 1200 + Math.random() * 3000;
    timerRef.current = setTimeout(() => {
      startRef.current = performance.now();
      setPhase("now");
    }, delay);
  };

  const handleClick = () => {
    if (phase === "idle" || phase === "result" || phase === "tooSoon") {
      arm();
    } else if (phase === "waiting") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase("tooSoon");
    } else if (phase === "now") {
      const reaction = Math.round(performance.now() - startRef.current);
      setMs(reaction);
      setBest((prev) => {
        const next = prev === null ? reaction : Math.min(prev, reaction);
        localStorage.setItem("reaction_best", String(next));
        return next;
      });
      setPhase("result");
    }
  };

  const bg =
    phase === "now"
      ? "bg-accent text-paper"
      : phase === "waiting"
      ? "bg-ink text-paper"
      : "bg-paper-2/60 text-ink";

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={`relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-line px-6 text-center transition-colors ${bg}`}
      >
        {phase === "idle" && (
          <>
            <p className="font-display text-2xl sm:text-3xl font-medium">Reaction Time</p>
            <p className="text-sm opacity-70">
              Click to start, then click the instant the screen turns coral.
            </p>
          </>
        )}
        {phase === "waiting" && (
          <>
            <p className="font-display text-2xl sm:text-3xl font-medium">Wait…</p>
            <p className="text-sm opacity-70">Get ready — click when it changes.</p>
          </>
        )}
        {phase === "now" && <p className="font-display text-4xl sm:text-5xl font-medium">CLICK!</p>}
        {phase === "tooSoon" && (
          <>
            <p className="font-display text-2xl sm:text-3xl font-medium">Too soon! 😅</p>
            <p className="text-sm opacity-70">Click to try again.</p>
          </>
        )}
        {phase === "result" && (
          <>
            <p className="font-display text-5xl sm:text-6xl font-medium">
              {ms}
              <span className="text-2xl"> ms</span>
            </p>
            <p className="text-sm opacity-70">
              {ms < 250 ? "⚡ Lightning reflexes!" : ms < 400 ? "Solid." : "Warm up and retry."}
            </p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-sm opacity-70">
              <RotateCcw className="h-4 w-4" /> Click to go again
            </span>
          </>
        )}
      </button>
      {best !== null && (
        <p className="mt-4 text-center text-sm text-muted">
          Best: <span className="font-semibold text-accent">{best} ms</span>
        </p>
      )}
    </div>
  );
}
