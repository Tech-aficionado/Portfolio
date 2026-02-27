"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => finishLoading(), 3500);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  const containerVariants: Variants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      exit="exit"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0514] px-4 overflow-hidden"
    >
      <div className="relative flex flex-col items-center w-full max-w-4xl">
        
        {/* DESKTOP LAYOUT - Horizontal Signature Reveal */}
        <div className="hidden md:flex flex-col items-center">
          <div className="relative h-32 w-full flex items-center justify-center">
            <svg
              viewBox="0 0 400 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[400px] h-auto drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              <defs>
                <linearGradient id="signatureGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>

                <mask id="revealMask">
                  <motion.path
                    d="M40,70 Q55,20 75,60 T110,65 T145,55 T180,70 T215,60 T250,65 T285,55 T320,70 T355,60"
                    stroke="white"
                    strokeWidth="60"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "linear" }}
                  />
                </mask>
              </defs>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-signature text-8xl opacity-10 blur-sm"
                fill="#A855F7"
              >
                Shivansh
              </text>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-signature text-8xl"
                fill="url(#signatureGrad)"
                mask="url(#revealMask)"
              >
                Shivansh
              </text>
            </svg>
          </div>
        </div>

        {/* MOBILE LAYOUT - Central Emblem + Name Reveal Below */}
        <div className="md:hidden flex flex-col items-center justify-center w-full gap-8">
          {/* Central Emblem Animation */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Multi-layered glow backgrounds */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-purple-600 blur-[40px] rounded-full"
            />
            
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
              <defs>
                <filter id="mobileGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Orbital Ring */}
              <motion.circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="white" 
                strokeWidth="0.5" 
                strokeDasharray="2 4" 
                className="opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Core Orb */}
              <motion.circle 
                cx="50" cy="50" r="32" 
                fill="#1e1b4b" 
                stroke="rgba(168, 85, 247, 0.5)" 
                strokeWidth="1"
                animate={{ 
                  scale: [0.95, 1.05, 0.95],
                  boxShadow: ["0 0 20px rgba(168, 85, 247, 0.2)", "0 0 40px rgba(168, 85, 247, 0.4)", "0 0 20px rgba(168, 85, 247, 0.2)"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Animated 'Z' Symbol (Stylized) */}
              <motion.path 
                d="M 35 35 L 65 35 L 35 65 L 65 65" 
                stroke="white" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                filter="url(#mobileGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, delay: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Name Display - Sweet letter-by-letter animation */}
          <div className="flex flex-col items-center gap-4 overflow-visible">
             <div className="flex overflow-visible h-14 md:h-20 items-center justify-center">
                {"Shivansh".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="font-signature text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 1.5 + (index * 0.1), 
                      duration: 0.8, 
                      ease: [0.34, 1.56, 0.64, 1] // Custom bouncy ease for "sweetness"
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
             </div>
             
             <motion.div
               initial={{ opacity: 0, letterSpacing: "0.5em" }}
               animate={{ opacity: 0.4, letterSpacing: "1em" }}
               transition={{ delay: 2.5, duration: 1.5 }}
               className="text-white text-[8px] uppercase font-light"
             >
                Portfolio 2026
             </motion.div>
          </div>
        </div>

        {/* COMMON LOADING BAR */}
        <div className="mt-12 flex flex-col items-center gap-4 w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/30 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-medium"
          >
            Initializing Interface
          </motion.div>
          
          <div className="w-48 md:w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: [0.45, 0, 0.55, 1] }}
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>
        </div>
      </div>
      
      {/* Background Dynamic Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"
      />
    </motion.div>
  );
}
