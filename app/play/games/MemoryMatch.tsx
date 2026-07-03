"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

const SYMBOLS = ["⚛️", "🐍", "☁️", "💾", "🎨", "⚡", "🔷", "🧩"];

interface Card {
  id: number;
  symbol: string;
  flipped: boolean;
  matched: boolean;
}

function buildDeck(): Card[] {
  const pairs = [...SYMBOLS, ...SYMBOLS];
  return pairs
    .map((symbol, i) => ({ id: i, symbol, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5)
    .map((c, i) => ({ ...c, id: i }));
}

export default function MemoryMatch(): React.JSX.Element {
  const [deck, setDeck] = useState<Card[]>([]);
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    setDeck(buildDeck());
  }, []);

  const won = useMemo(() => deck.length > 0 && deck.every((c) => c.matched), [deck]);

  const flip = (index: number) => {
    if (lock || deck[index].flipped || deck[index].matched) return;
    const next = deck.map((c, i) => (i === index ? { ...c, flipped: true } : c));
    setDeck(next);
    const nowPicked = [...picked, index];
    setPicked(nowPicked);

    if (nowPicked.length === 2) {
      setMoves((m) => m + 1);
      setLock(true);
      const [a, b] = nowPicked;
      if (next[a].symbol === next[b].symbol) {
        setTimeout(() => {
          setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
          setPicked([]);
          setLock(false);
        }, 450);
      } else {
        setTimeout(() => {
          setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c)));
          setPicked([]);
          setLock(false);
        }, 800);
      }
    }
  };

  const reset = () => {
    setDeck(buildDeck());
    setPicked([]);
    setMoves(0);
    setLock(false);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">
          Moves: <span className="font-semibold text-ink">{moves}</span>
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink hover:border-accent hover:text-accent transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Shuffle
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {deck.map((card, i) => {
          const show = card.flipped || card.matched;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(i)}
              className="relative aspect-square"
              aria-label={show ? card.symbol : "Hidden card"}
            >
              <motion.div
                animate={{ rotateY: show ? 180 : 0 }}
                transition={{ duration: 0.35 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative h-full w-full"
              >
                <span
                  className="absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl border border-line bg-ink text-paper"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center rounded-xl sm:rounded-2xl border text-2xl sm:text-3xl ${
                    card.matched ? "border-accent/50 bg-accent-soft" : "border-line bg-paper"
                  }`}
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  {card.symbol}
                </span>
              </motion.div>
            </button>
          );
        })}
      </div>

      {won && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-center font-display text-xl text-accent"
        >
          🎉 Cleared in {moves} moves!
        </motion.p>
      )}
    </div>
  );
}
