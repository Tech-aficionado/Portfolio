"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, X } from "lucide-react";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rot: number;
  vr: number;
}

export default function KonamiEasterEgg(): React.JSX.Element {
  const [unlocked, setUnlocked] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posRef = useRef(0);

  const fireConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);
    const colors = ["#ff4e1a", "#17130e", "#ffd23f", "#ff8a5c", "#ffffff"];

    const parts: Particle[] = Array.from({ length: 150 }, () => ({
      x: W / 2,
      y: H / 3,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -15 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
    }));

    const start = performance.now();
    const DURATION = 2800;
    const tick = (t: number) => {
      const elapsed = t - start;
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.vy += 0.35;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - elapsed / DURATION);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      if (elapsed < DURATION) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.key) return;
      const key = e.key.toLowerCase();
      if (key === SEQUENCE[posRef.current]) {
        posRef.current += 1;
        if (posRef.current === SEQUENCE.length) {
          posRef.current = 0;
          setUnlocked(true);
          fireConfetti();
          setTimeout(() => setUnlocked(false), 7000);
        }
      } else {
        posRef.current = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fireConfetti]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95]"
      />
      <AnimatePresence>
        {unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-6 left-1/2 z-[96] flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-line bg-paper px-5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
          >
            <span className="text-xl">🎮</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">Cheat code unlocked!</p>
              <p className="text-xs text-muted">You found the secret. Go play.</p>
            </div>
            <Link
              href="/play"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-2 text-xs font-medium text-paper hover:bg-accent transition-colors"
            >
              <Gamepad2 className="h-3.5 w-3.5" /> Arcade
            </Link>
            <button
              type="button"
              onClick={() => setUnlocked(false)}
              aria-label="Dismiss"
              className="text-muted hover:text-ink transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
