"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bug, RotateCcw, Timer, Trophy, Zap } from "lucide-react";

type Phase = "idle" | "running" | "over";
const ROUND_SECONDS = 30;

export default function BugSquash(): React.JSX.Element {
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [bug, setBug] = useState({ x: 50, y: 50, id: 0 });
  const [pops, setPops] = useState<{ id: number; x: number; y: number; value: number }[]>([]);
  const relocateRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("bugsquash_best");
    if (stored) setBest(parseInt(stored, 10) || 0);
  }, []);

  const relocateBug = useCallback(() => {
    setBug((b) => ({
      id: b.id + 1,
      x: 8 + Math.random() * 84,
      y: 12 + Math.random() * 76,
    }));
  }, []);

  useEffect(() => {
    if (phase !== "running") return;
    const speed = Math.max(500, 1150 - (ROUND_SECONDS - timeLeft) * 22);
    relocateRef.current = setTimeout(() => {
      setCombo(1);
      relocateBug();
    }, speed);
    return () => {
      if (relocateRef.current) clearTimeout(relocateRef.current);
    };
  }, [phase, bug.id, timeLeft, relocateBug]);

  useEffect(() => {
    if (phase !== "running") return;
    if (timeLeft <= 0) {
      setPhase("over");
      setBest((prev) => {
        const next = Math.max(prev, score);
        localStorage.setItem("bugsquash_best", String(next));
        return next;
      });
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, score]);

  const start = () => {
    setScore(0);
    setCombo(1);
    setTimeLeft(ROUND_SECONDS);
    setPops([]);
    setPhase("running");
    relocateBug();
  };

  const squash = () => {
    const gained = 10 * combo;
    setScore((s) => s + gained);
    setPops((p) => [...p.slice(-6), { id: bug.id, x: bug.x, y: bug.y, value: gained }]);
    setCombo((c) => Math.min(c + 1, 10));
    relocateBug();
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <Stat icon={<Zap className="h-4 w-4" />} label="Score" value={score} />
        <Stat icon={<Timer className="h-4 w-4" />} label="Time" value={`${timeLeft}s`} />
        <Stat icon={<Trophy className="h-4 w-4" />} label="Best" value={best} />
      </div>

      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-paper-2">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${(combo / 10) * 100}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-paper-2/50">
        <AnimatePresence>
          {pops.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -40, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 font-display text-lg font-semibold text-accent"
            >
              +{p.value}
            </motion.span>
          ))}
        </AnimatePresence>

        {phase === "running" && (
          <motion.button
            key={bug.id}
            type="button"
            onClick={squash}
            aria-label="Squash the bug"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-lg hover:bg-accent transition-colors"
          >
            <Bug className="h-7 w-7" />
          </motion.button>
        )}

        <AnimatePresence>
          {phase !== "running" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-paper/60 backdrop-blur-sm text-center px-6"
            >
              {phase === "over" ? (
                <>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">Time&apos;s up</p>
                  <p className="font-display text-5xl font-medium">{score}</p>
                  <p className="text-sm text-muted">
                    {score >= best && score > 0 ? "🏆 New best!" : `Best: ${best}`}
                  </p>
                </>
              ) : (
                <>
                  <Bug className="h-10 w-10 text-accent" />
                  <p className="max-w-xs text-sm text-muted">
                    Squash as many bugs as you can in {ROUND_SECONDS}s. Chain hits to build a
                    combo — miss one and it resets.
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={start}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
              >
                {phase === "over" ? (
                  <>
                    <RotateCcw className="h-4 w-4" /> Play again
                  </>
                ) : (
                  <>
                    Start <span className="transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-line bg-paper px-4 py-3">
      <div className="flex items-center gap-1.5 text-muted">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.2em]">{label}</span>
      </div>
      <p className="mt-1 font-display text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
