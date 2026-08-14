"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const PHRASES = [
  "ship it and iterate",
  "clean code reads like prose",
  "premature optimization is the root of all evil",
  "make it work then make it fast",
  "the best error message is the one that never shows up",
  "simplicity is the ultimate sophistication",
];

function randomPhrase(): string {
  return PHRASES[Math.floor(Math.random() * PHRASES.length)];
}

export default function TypingTest(): React.JSX.Element {
  const [phrase, setPhrase] = useState(randomPhrase);
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState(() => {
    if (typeof window === "undefined") return 0;
    const stored = localStorage.getItem("typing_best");
    return stored ? parseInt(stored, 10) : 0;
  });
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const pick = () => {
    setPhrase(randomPhrase());
    setInput("");
    setStartedAt(null);
    setDone(false);
    setWpm(0);
    setAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Live WPM ticks from an interval. The elapsed time is computed in the
  // callback and passed to setWpm as a plain value — not via an updater, since
  // reading performance.now() inside an updater would make it impure.
  useEffect(() => {
    if (!startedAt || done) return;
    const id = setInterval(() => {
      const minutes = (performance.now() - startedAt) / 60000;
      const words = input.trim().length / 5;
      setWpm(minutes > 0 ? Math.round(words / minutes) : 0);
    }, 300);
    intervalRef.current = id;
    return () => clearInterval(id);
  }, [startedAt, done, input]);

  const computeStats = (currentInput: string, start: number) => {
    const minutes = (performance.now() - start) / 60000;
    const words = currentInput.trim().length / 5;
    const correct = [...currentInput].filter((ch, i) => ch === phrase[i]).length;
    const acc = currentInput.length ? Math.round((correct / currentInput.length) * 100) : 100;
    const currentWpm = minutes > 0 ? Math.round(words / minutes) : 0;
    return { wpm: currentWpm, accuracy: acc };
  };

  const onChange = (v: string) => {
    if (done) return;
    let start = startedAt;
    if (!startedAt && v.length === 1) {
      start = performance.now();
      setStartedAt(start);
    }
    setInput(v);

    // Update accuracy on each keystroke
    const correct = [...v].filter((ch, i) => ch === phrase[i]).length;
    setAccuracy(v.length ? Math.round((correct / v.length) * 100) : 100);

    if (v === phrase && start) {
      const stats = computeStats(v, start);
      setWpm(stats.wpm);
      setAccuracy(stats.accuracy);
      setDone(true);
      setBest((prev) => {
        const next = Math.max(prev, stats.wpm);
        localStorage.setItem("typing_best", String(next));
        return next;
      });
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <div className="flex gap-3 sm:gap-4">
          <span>WPM <b className="text-accent">{wpm}</b></span>
          <span>Acc <b className="text-ink">{accuracy}%</b></span>
          <span>Best <b className="text-ink">{best}</b></span>
        </div>
        <button
          type="button"
          onClick={pick}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink hover:border-accent hover:text-accent transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" /> New phrase
        </button>
      </div>

      <div className="rounded-3xl border border-line bg-paper-2/50 p-6 sm:p-8">
        <p className="font-display text-xl sm:text-3xl leading-relaxed break-words">
          {phrase.split("").map((ch, i) => {
            const typed = input[i];
            const state =
              typed == null ? "text-ink/30" : typed === ch ? "text-ink" : "text-accent underline";
            return (
              <span key={i} className={state}>
                {ch}
              </span>
            );
          })}
        </p>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => onChange(e.target.value)}
          disabled={done}
          placeholder="Start typing…"
          className="mt-6 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink outline-none focus:border-accent disabled:opacity-60"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />

        {done && (
          <p className="mt-4 font-display text-xl text-accent">
            ⌨️ {wpm} WPM at {accuracy}% accuracy!
          </p>
        )}
      </div>
    </div>
  );
}
