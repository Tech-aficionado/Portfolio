"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";

const MAX = 100;

export default function GuessNumber(): React.JSX.Element {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState("I'm thinking of a number between 1 and 100.");
  const [won, setWon] = useState(false);
  const [best, setBest] = useState<number | null>(null);

  const reset = () => {
    setTarget(Math.floor(Math.random() * MAX) + 1);
    setGuess("");
    setAttempts(0);
    setHint("I'm thinking of a number between 1 and 100.");
    setWon(false);
  };

  useEffect(() => {
    reset();
    const stored = localStorage.getItem("guess_best");
    if (stored) setBest(parseInt(stored, 10));
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(guess, 10);
    if (Number.isNaN(n) || n < 1 || n > MAX || won) return;
    const tries = attempts + 1;
    setAttempts(tries);
    if (n === target) {
      setWon(true);
      setHint(`🎯 Nailed it in ${tries} ${tries === 1 ? "try" : "tries"}!`);
      setBest((prev) => {
        const next = prev === null ? tries : Math.min(prev, tries);
        localStorage.setItem("guess_best", String(next));
        return next;
      });
    } else {
      setHint(n < target ? "📈 Higher…" : "📉 Lower…");
    }
    setGuess("");
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <div className="flex gap-3 sm:gap-4">
          <span>Attempts <b className="text-ink">{attempts}</b></span>
          {best !== null && <span>Best <b className="text-accent">{best}</b></span>}
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink hover:border-accent hover:text-accent transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" /> New number
        </button>
      </div>

      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-6 rounded-3xl border border-line bg-paper-2/50 px-6 text-center">
        <p className="font-display text-2xl sm:text-4xl leading-snug text-ink max-w-sm">{hint}</p>

        {!won && (
          <form onSubmit={submit} className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={MAX}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="1–100"
              className="w-28 rounded-xl border border-line bg-paper px-4 py-3 text-center text-lg text-ink outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-accent transition-colors"
            >
              Guess
            </button>
          </form>
        )}

        {won && (
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper hover:bg-accent transition-colors"
          >
            Play again
          </button>
        )}
      </div>
    </div>
  );
}
