"use client";

import { motion, Variants } from "framer-motion";
import { useEffect } from "react";

export default function SplashScreen({
  finishLoading,
}: {
  finishLoading: () => void;
}) {
  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 2600);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  const container: Variants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  const word: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({
      y: "0%",
      transition: { duration: 0.8, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const words = ["Shivansh", "Goel"];

  return (
    <motion.div
      variants={container}
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper px-6"
    >
      <div className="flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 text-[11px] uppercase tracking-[0.5em] text-muted"
        >
          Portfolio — 2026
        </motion.span>

        <h1 className="font-display text-5xl sm:text-8xl font-medium leading-[0.95] text-ink text-center">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={word}
                initial="hidden"
                animate="show"
                className="inline-block"
              >
                {i === 1 ? <span className="italic text-accent">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      {/* Progress line */}
      <div className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 w-[80vw] max-w-xs sm:w-72">
        <div className="h-px w-full bg-line overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: [0.45, 0, 0.55, 1] }}
            className="h-full bg-accent"
          />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.3em] text-muted">
          <span>Loading</span>
          <span className="truncate">Full Stack Developer</span>
        </div>
      </div>
    </motion.div>
  );
}
