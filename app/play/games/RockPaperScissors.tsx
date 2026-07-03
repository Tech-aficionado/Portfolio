"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MOVES = [
  { key: "rock", emoji: "🪨", label: "Rock" },
  { key: "paper", emoji: "📄", label: "Paper" },
  { key: "scissors", emoji: "✂️", label: "Scissors" },
] as const;

type MoveKey = (typeof MOVES)[number]["key"];

function decide(you: MoveKey, cpu: MoveKey): "win" | "lose" | "draw" {
  if (you === cpu) return "draw";
  const beats: Record<MoveKey, MoveKey> = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };
  return beats[you] === cpu ? "win" : "lose";
}

export default function RockPaperScissors(): React.JSX.Element {
  const [you, setYou] = useState<MoveKey | null>(null);
  const [cpu, setCpu] = useState<MoveKey | null>(null);
  const [outcome, setOutcome] = useState<"win" | "lose" | "draw" | null>(null);
  const [score, setScore] = useState({ w: 0, l: 0 });

  const play = (move: MoveKey) => {
    const cpuMove = MOVES[Math.floor(Math.random() * 3)].key;
    const res = decide(move, cpuMove);
    setYou(move);
    setCpu(cpuMove);
    setOutcome(res);
    if (res === "win") setScore((s) => ({ ...s, w: s.w + 1 }));
    if (res === "lose") setScore((s) => ({ ...s, l: s.l + 1 }));
  };

  const emojiOf = (k: MoveKey | null) => MOVES.find((m) => m.key === k)?.emoji ?? "❔";

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-6 text-sm text-muted">
        <span>Wins <b className="text-accent">{score.w}</b></span>
        <span>Losses <b className="text-ink">{score.l}</b></span>
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-6 rounded-3xl border border-line bg-paper-2/50 py-8 sm:py-10">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">You</p>
          <motion.div key={`you-${you}`} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="text-5xl sm:text-6xl">
            {emojiOf(you)}
          </motion.div>
        </div>
        <span className="font-display text-xl sm:text-2xl text-muted">vs</span>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-2">CPU</p>
          <motion.div key={`cpu-${cpu}`} initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="text-5xl sm:text-6xl">
            {emojiOf(cpu)}
          </motion.div>
        </div>
      </div>

      <p className="mt-4 text-center font-display text-2xl">
        {outcome === "win" && <span className="text-accent">You win! 🎉</span>}
        {outcome === "lose" && <span className="text-muted">You lose 😬</span>}
        {outcome === "draw" && <span className="text-muted">Draw 🤝</span>}
        {outcome === null && <span className="text-muted">Make your move</span>}
      </p>

      <div className="mt-6 flex justify-center gap-2 sm:gap-3">
        {MOVES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => play(m.key)}
            className="flex flex-1 max-w-[7rem] flex-col items-center gap-1 rounded-2xl border border-line bg-paper px-3 py-3 sm:px-5 hover:border-accent hover:bg-accent-soft/50 transition-colors"
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className="text-xs font-medium text-ink">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
