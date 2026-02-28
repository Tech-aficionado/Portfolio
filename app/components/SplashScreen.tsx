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
      {/* Background Particles for Desktop/Tablet */}
      <div className="absolute inset-0 hidden md:block overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              y: [null, (Math.random() * -100 - 50) + "px"],
              opacity: [null, 0]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-purple-500 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center w-full max-w-6xl">
        
        {/* UNIFIED DESKTOP & TABLET LAYOUT */}
        <div className="hidden md:flex flex-col items-center gap-12 w-full">
          {/* Enhanced Emblem */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-purple-600 blur-[60px] rounded-full"
            />
            
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
              <defs>
                <filter id="desktopGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Multiple Orbital Rings */}
              <motion.circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="white" 
                strokeWidth="0.3" 
                strokeDasharray="1 6" 
                className="opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle 
                cx="50" cy="50" r="42" 
                fill="none" 
                stroke="white" 
                strokeWidth="0.5" 
                strokeDasharray="4 8" 
                className="opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Core Orb */}
              <motion.circle 
                cx="50" cy="50" r="30" 
                fill="#1e1b4b" 
                stroke="rgba(168, 85, 247, 0.6)" 
                strokeWidth="1"
                animate={{ 
                  scale: [0.98, 1.05, 0.98],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.path 
                d="M 35 35 L 65 35 L 35 65 L 65 65" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                filter="url(#desktopGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Signature Reveal */}
          <div className="relative h-24 w-full flex items-center justify-center">
            <svg
              viewBox="0 0 400 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[500px] h-auto drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              <defs>
                <linearGradient id="signatureGradDesktop" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>

                <mask id="revealMaskDesktop">
                  <motion.path
                    d="M40,70 Q55,20 75,60 T110,65 T145,55 T180,70 T215,60 T250,65 T285,55 T320,70 T355,60"
                    stroke="white"
                    strokeWidth="60"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.2, delay: 1, ease: "linear" }}
                  />
                </mask>
              </defs>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-signature text-8xl opacity-10 blur-sm select-none"
                fill="#A855F7"
              >
                Shivansh
              </text>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-signature text-8xl select-none"
                fill="url(#signatureGradDesktop)"
                mask="url(#revealMaskDesktop)"
              >
                Shivansh
              </text>
            </svg>
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col items-center justify-center w-full gap-8">
          <div className="relative w-48 h-48 flex items-center justify-center">
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

              <motion.circle 
                cx="50" cy="50" r="32" 
                fill="#1e1b4b" 
                stroke="rgba(168, 85, 247, 0.5)" 
                strokeWidth="1"
                animate={{ 
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

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

          <div className="flex flex-col items-center gap-4 overflow-visible">
             <div className="flex overflow-visible h-14 items-center justify-center">
                {"Shivansh".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    className="font-signature text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 1.5 + (index * 0.1), 
                      duration: 0.8, 
                      ease: [0.34, 1.56, 0.64, 1]
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
          
          <div className="w-48 md:w-80 lg:w-96 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
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
