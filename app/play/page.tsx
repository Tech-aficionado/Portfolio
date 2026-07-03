"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Gamepad2 } from "lucide-react";

import BugSquash from "./games/BugSquash";
import ReactionTime from "./games/ReactionTime";
import MemoryMatch from "./games/MemoryMatch";
import TicTacToe from "./games/TicTacToe";
import RockPaperScissors from "./games/RockPaperScissors";
import TypingTest from "./games/TypingTest";
import Simon from "./games/Simon";
import GuessNumber from "./games/GuessNumber";

interface GameDef {
  slug: string;
  title: string;
  tagline: string;
  emoji: string;
  Component: () => React.JSX.Element;
}

const GAMES: GameDef[] = [
  { slug: "bug-squash", title: "Bug Squash", tagline: "Reflex clicker — squash bugs, build combos.", emoji: "🐛", Component: BugSquash },
  { slug: "reaction", title: "Reaction Time", tagline: "Click the instant it turns coral.", emoji: "⚡", Component: ReactionTime },
  { slug: "memory", title: "Memory Match", tagline: "Flip and pair the tech tiles.", emoji: "🧩", Component: MemoryMatch },
  { slug: "tictactoe", title: "Tic-Tac-Toe", tagline: "Classic three-in-a-row vs the CPU.", emoji: "⭕", Component: TicTacToe },
  { slug: "rps", title: "Rock Paper Scissors", tagline: "Best the computer, keep your streak.", emoji: "✂️", Component: RockPaperScissors },
  { slug: "typing", title: "Typing Speed", tagline: "How fast can you ship a phrase?", emoji: "⌨️", Component: TypingTest },
  { slug: "simon", title: "Sequence", tagline: "Repeat the growing pattern.", emoji: "🎵", Component: Simon },
  { slug: "guess", title: "Guess the Number", tagline: "Binary-search your way to 1–100.", emoji: "🎯", Component: GuessNumber },
];

export default function ArcadePage(): React.JSX.Element {
  const [active, setActive] = useState<GameDef | null>(null);

  return (
    <main className="min-h-screen bg-paper text-ink paper-grain px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          {active ? (
            <button
              type="button"
              onClick={() => setActive(null)}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Arcade
            </button>
          ) : (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Coffee break</p>
              <h1 className="font-display text-4xl sm:text-5xl font-medium leading-tight">
                The <span className="italic text-accent">Arcade</span>
              </h1>
            </div>
          )}
          <Link
            href="/"
            className="text-sm text-muted hover:text-ink transition-colors whitespace-nowrap"
          >
            ← Portfolio
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl">{active.emoji}</span>
                <div>
                  <h2 className="font-display text-2xl font-medium leading-none">{active.title}</h2>
                  <p className="text-sm text-muted">{active.tagline}</p>
                </div>
              </div>
              <active.Component />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="mb-8 max-w-lg text-muted">
                Eight tiny browser games to reset your brain between commits. Scores save
                locally — no accounts, no tracking. Pick one 👇
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {GAMES.map((g, i) => (
                  <motion.button
                    key={g.slug}
                    type="button"
                    onClick={() => setActive(g)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-paper p-5 text-left transition-colors hover:border-accent/40 hover:bg-accent-soft/40"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-paper-2 text-2xl transition-transform group-hover:scale-110">
                      {g.emoji}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-medium text-ink">
                        {g.title}
                      </span>
                      <span className="block text-sm text-muted">{g.tagline}</span>
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted">
                <Gamepad2 className="h-4 w-4" />
                Built for fun · zero dependencies beyond the site itself
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
