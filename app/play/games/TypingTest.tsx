"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const PHRASES = [
  "ship it and iterate",
  "clean code reads like prose",
  "premature optimization is the root of all evil",
  "make it work then make it fast",
  "the best error message is the one that never shows up",
  "simplicity is the ultimate sophistication",
];

export default function TypingTest(): React.JSX.Element {
  const [phrase, setPhrase] = useState("");
  const [input, setInput] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [best, setBest] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const pick = () => {
    setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
    setInput("");
    setStartedAt(null);
    setDone(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    pick();
    const stored = localStorage.getItem("typing_best");
    if (stored) setBest(parseInt(stored, 10));
  }, []);

  const { wpm, accuracy } = useMemo(() => {
    if (!startedAt) return { wpm: 0, accuracy: 100 };
    const minutes = (performance.now() - startedAt) / 60000;
    const words = input.trim().length / 5;
    const correct = [...input].filter((ch, i) => ch === phrase[i]).length;
    const acc = input.length ? Math.round((correct / input.length) * 100) : 100;
    return { wpm: minutes > 0 ? Math.round(words / minutes) : 0, accuracy: acc };
  }, [input, startedAt, phrase]);

  const onChange = (v: string) => {
    if (done) return;
    if (!startedAt && v.length === 1) setStartedAt(performance.now());
    setInput(v);
    if (v === phrase) {
      setDone(true);
      setBest((prev) => {
        const next = Math.max(prev, wpm);
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
