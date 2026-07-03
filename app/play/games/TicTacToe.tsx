"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

type Cell = "X" | "O" | null;
const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function winner(b: Cell[]): Cell | "draw" | null {
  for (const [a, c, d] of LINES) {
    if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  }
  return b.every(Boolean) ? "draw" : null;
}

// Simple AI: win > block > center > random
function aiMove(b: Cell[]): number {
  const empty = b.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
  for (const line of LINES) {
    const [a, c, d] = line;
    const trio = [b[a], b[c], b[d]];
    if (trio.filter((v) => v === "O").length === 2 && trio.includes(null))
      return line[trio.indexOf(null)];
  }
  for (const line of LINES) {
    const [a, c, d] = line;
    const trio = [b[a], b[c], b[d]];
    if (trio.filter((v) => v === "X").length === 2 && trio.includes(null))
      return line[trio.indexOf(null)];
  }
  if (!b[4]) return 4;
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToe(): React.JSX.Element {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [score, setScore] = useState({ w: 0, l: 0, d: 0 });
  const result = winner(board);

  useEffect(() => {
    if (result) {
      setScore((s) =>
        result === "X"
          ? { ...s, w: s.w + 1 }
          : result === "O"
          ? { ...s, l: s.l + 1 }
          : { ...s, d: s.d + 1 }
      );
      return;
    }
    if (turn === "O") {
      const t = setTimeout(() => {
        setBoard((b) => {
          if (winner(b)) return b;
          const move = aiMove(b);
          const nb = [...b];
          nb[move] = "O";
          return nb;
        });
        setTurn("X");
      }, 420);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, result]);

  const play = (i: number) => {
    if (board[i] || result || turn !== "X") return;
    const nb = [...board];
    nb[i] = "X";
    setBoard(nb);
    setTurn("O");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3 sm:gap-4 text-sm text-muted">
          <span>You <b className="text-ink">{score.w}</b></span>
          <span>AI <b className="text-ink">{score.l}</b></span>
          <span>Draw <b className="text-ink">{score.d}</b></span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink hover:border-accent hover:text-accent transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" /> New round
        </button>
      </div>

      <div className="mx-auto grid max-w-sm grid-cols-3 gap-2 sm:gap-3">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => play(i)}
            className="flex aspect-square items-center justify-center rounded-2xl border border-line bg-paper font-display text-4xl sm:text-5xl font-medium hover:bg-paper-2 transition-colors"
          >
            <motion.span
              key={cell ?? "empty"}
              initial={cell ? { scale: 0 } : false}
              animate={{ scale: 1 }}
              className={cell === "X" ? "text-ink" : "text-accent"}
            >
              {cell}
            </motion.span>
          </button>
        ))}
      </div>

      <p className="mt-5 text-center font-display text-xl">
        {result === "X" && <span className="text-accent">You win! 🎉</span>}
        {result === "O" && <span className="text-muted">AI wins — rematch?</span>}
        {result === "draw" && <span className="text-muted">It&apos;s a draw.</span>}
        {!result && <span className="text-muted">{turn === "X" ? "Your move (X)" : "AI thinking…"}</span>}
      </p>
    </div>
  );
}
