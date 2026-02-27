"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Banner(): React.JSX.Element {
  const texts = ["Full Stack Developer", "Software Engineer", "Web Developer"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

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
      className="min-h-screen flex items-center justify-center pt-24 pb-12 sm:pt-28 sm:pb-20 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background glow for the entire section */}
      <div className="absolute top-1/4 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-900/20 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* Left side - All Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left w-full"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                Hello! I Am Shivansh Goel
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight sm:leading-[1.1] mb-4 sm:mb-6 tracking-tight"
              >
                Crafting Digital <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                  Excellence
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/90 mb-4 sm:mb-6 h-10 sm:h-12"
              >
                I'm a <span className="text-purple-400">{displayedText}</span><span className="animate-pulse font-light text-white/50">|</span>
              </motion.p>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-base sm:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0"
              >
                Skilled in JavaScript, Python, React, Next.js, and Cloud. I build robust, user-centric web solutions that empower businesses and startups to scale dynamically in the digital landscape.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                <a 
                  href="#contact" 
                  className="px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:-translate-y-1 text-sm sm:text-base"
                >
                  Let's Collaborate
                </a>
                <div className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs sm:text-sm backdrop-blur-sm">
                  <span>📍 Based in India 🇮🇳</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side - 3D Character Image + Deco Elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 w-full flex justify-center lg:justify-end relative mt-6 lg:mt-0"
          >
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px]">
              {/* Massive center glow */}
              <div className="absolute inset-0 bg-purple-600/30 blur-[80px] sm:blur-[100px] rounded-full mix-blend-screen"></div>
              
              {/* The avatar setup - Max size limits applied to keep source image perfectly crisp */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/me.png"
                  alt="Shivansh Goel - Developer"
                  fill
                  className="object-contain z-10 relative drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                  priority
                  sizes="(max-width: 768px) 280px, 380px"
                  quality={100}
                />
              </motion.div>
              
              {/* High-Fidelity 3D Glass Floating Elements */}
              {/* Top Right: React Icon Card */}
              <motion.div 
                animate={{ y: [0, -10, 0], rotate: [12, 15, 12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 lg:top-8 lg:-right-10 w-14 h-14 sm:w-16 sm:h-16 lg:w-[84px] lg:h-[84px] bg-gradient-to-br from-[#2a1b4d] to-[#120822] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-[1.2rem] backdrop-blur-xl flex items-center justify-center z-20"
              >
                <svg viewBox="-3 -3 30 30" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-[#61DAFB] drop-shadow-[0_0_12px_rgba(97,218,251,0.6)]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
                </svg>
              </motion.div>
              
              {/* Bottom Left: Lightning Icon Card */}
              <motion.div 
                animate={{ y: [0, 10, 0], rotate: [-12, -15, -12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 -left-4 lg:bottom-12 lg:-left-12 w-14 h-14 sm:w-16 sm:h-16 lg:w-[84px] lg:h-[84px] bg-gradient-to-br from-[#2a164d] to-[#0f0421] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.2)] rounded-full backdrop-blur-xl flex items-center justify-center z-20"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-11 lg:h-11 text-[#FF9D00] drop-shadow-[0_0_15px_rgba(255,157,0,0.8)]" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </motion.div>
              
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
