"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import CountUp from "./CountUp";
import { PORTFOLIO_STATS } from "../portfolio-stats";

const ROLE_TITLES = ["AI Product Engineer", "Applied AI Builder", "Full Stack Developer"];

function TypewriterRole(): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const currentText = ROLE_TITLES[currentTextIndex];

    if (!isDeleting && displayedText.length < currentText.length) {
      const timeout = window.setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, typingSpeed);
      return () => window.clearTimeout(timeout);
    }

    if (!isDeleting) {
      const timeout = window.setTimeout(() => {
        setIsDeleting(true);
        setTypingSpeed(50);
      }, 2000);
      return () => window.clearTimeout(timeout);
    }

    if (displayedText.length > 0) {
      const timeout = window.setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1));
      }, typingSpeed);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setIsDeleting(false);
      setTypingSpeed(100);
      setCurrentTextIndex((previous) => (previous + 1) % ROLE_TITLES.length);
    }, typingSpeed);
    return () => window.clearTimeout(timeout);
  }, [currentTextIndex, displayedText, isDeleting, shouldReduceMotion, typingSpeed]);

  return (
    <>
      <span className="text-accent">
        {shouldReduceMotion ? ROLE_TITLES[0] : displayedText}
      </span>
      <span className="animate-pulse font-light text-muted">|</span>
    </>
  );
}

export default function Banner(): React.JSX.Element {
  const spotX = useMotionValue(-400);
  const spotY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${spotX}px ${spotY}px, rgba(255, 78, 26, 0.10), transparent 65%)`;

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }

  return (
    <section
      id="home"
      onMouseMove={handleMove}
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4 sm:px-6"
    >
      {/* Cursor-follow spotlight */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
      />
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-2/60 px-4 py-1.5 text-xs font-medium text-muted mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to AI product &amp; full-stack roles
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[5.5rem] font-medium leading-[1.02] sm:leading-[0.98] tracking-tight text-ink">
              Building AI
              <br />
              products for the
              <br />
              <span className="italic text-accent">real world.</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-lg sm:text-2xl font-medium text-ink/80">
              I&apos;m Shivansh — <TypewriterRole />
            </p>

            <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted leading-relaxed">
              I turn AI ideas into dependable web products — from adaptive
              fitness and learning tools to privacy-first SaaS — using Next.js,
              Python, and cloud infrastructure.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm sm:text-base font-medium text-paper hover:bg-accent transition-colors"
              >
                Let&apos;s collaborate
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#lab"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-sm sm:text-base font-medium text-ink hover:border-ink/50 transition-colors"
              >
                View work
              </a>
              <a
                href="https://drive.google.com/file/d/1yd0N1QKORwi_b7wwOQcBD3sO3D1Y4-EL/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft/50 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent-soft sm:text-base"
                aria-label="View Shivansh Goel's résumé in Google Drive"
              >
                View résumé
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-sm text-muted">
              <span>📍 Based in India 🇮🇳</span>
            </div>
          </motion.div>

          {/* Right — portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative isolate h-[19rem] w-64 sm:h-[420px] sm:w-[340px]">
              {/* Sculpted editorial canvas */}
              <div
                aria-hidden="true"
                className="absolute -right-7 top-9 h-40 w-40 rounded-full border-[18px] border-accent/10 sm:-right-10 sm:h-52 sm:w-52 sm:border-[22px]"
              />
              <div
                aria-hidden="true"
                style={{ borderRadius: "4.5rem 1.75rem 4.5rem 1.75rem" }}
                className="absolute inset-1 rotate-5 border border-accent/30 bg-accent-soft shadow-[0_24px_80px_rgba(255,78,26,0.18)]"
              />
              <div
                aria-hidden="true"
                style={{ borderRadius: "1.75rem 4.5rem 1.75rem 4.5rem" }}
                className="absolute -inset-1 -rotate-2 border border-line bg-paper-2 shadow-[0_18px_60px_rgba(23,19,14,0.10)]"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-4 left-7 h-1.5 w-24 -rotate-6 rounded-full bg-accent shadow-[0_5px_18px_rgba(255,78,26,0.35)] sm:left-10 sm:w-32"
              />

              {/* Portrait */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 -top-4 bottom-0"
              >
                <div
                  style={{ borderRadius: "4.25rem 1.5rem 4.25rem 1.5rem" }}
                  className="relative h-full w-full overflow-hidden border-[7px] border-paper bg-[#11100f] shadow-[0_30px_80px_rgba(23,19,14,0.25)] ring-1 ring-ink/10"
                >
                  <Image
                    src="/Self-Image.jpeg"
                    alt="Shivansh Goel"
                    fill
                    className="object-cover object-[50%_42%]"
                    priority
                    sizes="(max-width: 768px) 256px, 340px"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]"
                  />

                  <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(255,78,26,0.24)]" />
                    Portrait / 01
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute bottom-6 left-6 h-10 w-10 border-b-2 border-l-2 border-accent"
                  />
                </div>
              </motion.div>

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 sm:-left-8 top-10 rounded-2xl bg-paper border border-line shadow-[0_8px_30px_rgba(23,19,14,0.08)] px-4 py-3"
              >
                <p className="font-display text-2xl font-semibold text-ink leading-none">
                  <CountUp
                    value={PORTFOLIO_STATS.experienceYears}
                    decimals={1}
                    suffix="+"
                  />
                </p>
                <p className="text-[11px] uppercase tracking-wider text-muted mt-1">
                  Years exp
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -right-2 sm:-right-6 bottom-16 rounded-2xl bg-ink text-paper shadow-[0_8px_30px_rgba(23,19,14,0.15)] px-4 py-3"
              >
                <p className="font-display text-2xl font-semibold leading-none">
                  <CountUp value={PORTFOLIO_STATS.aiProducts} />
                </p>
                <p className="text-[11px] uppercase tracking-wider text-paper/60 mt-1">
                  AI products
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="text-lg"
        >
          ↓
        </motion.span>
      </div>
    </section>
  );
}
