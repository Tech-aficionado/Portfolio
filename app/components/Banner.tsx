"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import CountUp from "./CountUp";

export default function Banner(): React.JSX.Element {
  const texts = useMemo(
    () => ["Full Stack Developer", "Software Engineer", "Web Developer"],
    []
  );
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Cursor-follow spotlight
  const spotX = useMotionValue(-400);
  const spotY = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${spotX}px ${spotY}px, rgba(255, 78, 26, 0.10), transparent 65%)`;

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(50);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length - 1));
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTypingSpeed(100);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [displayedText, isDeleting, currentTextIndex, texts, typingSpeed]);

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
              Available for new projects
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[5.5rem] font-medium leading-[1.02] sm:leading-[0.98] tracking-tight text-ink">
              Crafting
              <br />
              digital{" "}
              <span className="italic text-accent">excellence</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-lg sm:text-2xl font-medium text-ink/80">
              I&apos;m Shivansh, a{" "}
              <span className="text-accent">{displayedText}</span>
              <span className="animate-pulse font-light text-muted">|</span>
            </p>

            <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted leading-relaxed">
              Skilled in JavaScript, Python, React, Next.js, and Cloud. I build
              robust, user-centric web solutions that empower businesses and
              startups to scale dynamically in the digital landscape.
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
            <div className="relative w-64 h-[19rem] sm:w-[340px] sm:h-[420px]">
              {/* Accent panel */}
              <div className="absolute inset-0 rounded-[2rem] bg-accent-soft border border-accent/20 rotate-3" />
              <div className="absolute inset-0 rounded-[2rem] bg-paper-2 border border-line -rotate-2" />

              {/* Portrait */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 -top-4 bottom-0"
              >
                <Image
                  src="/assets/me.png"
                  alt="Shivansh Goel"
                  fill
                  className="object-contain object-bottom"
                  priority
                  sizes="(max-width: 768px) 256px, 340px"
                />
              </motion.div>

              {/* Floating stat badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 sm:-left-8 top-10 rounded-2xl bg-paper border border-line shadow-[0_8px_30px_rgba(23,19,14,0.08)] px-4 py-3"
              >
                <p className="font-display text-2xl font-semibold text-ink leading-none">
                  <CountUp value={1.5} decimals={1} suffix="+" />
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
                  <CountUp value={7} suffix="+" />
                </p>
                <p className="text-[11px] uppercase tracking-wider text-paper/60 mt-1">
                  Projects
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
