"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({
  finishLoading,
}: {
  finishLoading: () => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<{ x: string; y: string; opacity: number; scale: number; driftY: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setIsMounted(true);
      
      // Generate particles only on the client
      const generatedParticles = [...Array(20)].map(() => ({
        x: Math.random() * 100 + "%",
        y: Math.random() * 100 + "%",
        opacity: Math.random() * 0.3,
        scale: Math.random() * 0.5 + 0.5,
        driftY: Math.random() * -100 - 50 + "px",
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }));
      setParticles(generatedParticles);
    });

    const timeout = setTimeout(() => finishLoading(), 5000);
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeout);
    };
  }, [finishLoading]);

  const containerVariants: Variants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      exit="exit"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0514] px-4 overflow-hidden"
    >
      {/* Background Particles for Desktop/Tablet */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isMounted &&
          particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{
                x: p.x,
                y: p.y,
                opacity: p.opacity,
                scale: p.scale,
              }}
              animate={{
                y: [null, p.driftY],
                opacity: [null, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
                delay: p.delay,
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
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-purple-600 blur-[80px] rounded-full"
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
                cx="50" cy="50" r={48} 
                fill="none" 
                stroke="white" 
                strokeWidth="0.2" 
                strokeDasharray="1 10" 
                className="opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.circle 
                cx="50" cy="50" r={40} 
                fill="none" 
                stroke="white" 
                strokeWidth="0.5" 
                strokeDasharray="5 15" 
                className="opacity-30"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Core Orb with Pulsing Data Ring */}
              <motion.circle 
                cx="50" cy="50" r={25} 
                fill="#1e1b4b" 
                stroke="rgba(168, 85, 247, 0.8)" 
                strokeWidth="1.5"
                animate={{ 
                  scale: isMounted ? [0.95, 1.1, 0.95] : 1,
                  strokeWidth: isMounted ? [1.5, 3, 1.5] : 1.5,
                  opacity: isMounted ? [0.6, 1, 0.6] : 0.6
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.path 
                d="M 40 40 L 60 40 L 40 60 L 60 60" 
                stroke="white" 
                strokeWidth="2.5" 
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

          {/* Loading Data Stream Text */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-mono text-purple-400 text-sm tracking-widest"
            >
              ESTABLISHING UPLINK...
            </motion.div>
            <div className="flex gap-4">
               {["01", "10", "11", "00"].map((code, i) => (
                 <motion.span 
                   key={i}
                   animate={{ opacity: [0.2, 1, 0.2] }}
                   transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                   className="font-mono text-[10px] text-white/20"
                 >
                   {code}
                 </motion.span>
               ))}
            </div>
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden flex flex-col items-center justify-center w-full gap-8">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-purple-600 blur-[40px] rounded-full"
            />

            <svg
              viewBox="0 0 100 100"
              className="w-full h-full relative z-10 overflow-visible"
            >
              <defs>
                <filter
                  id="mobileGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <motion.circle
                cx="50"
                cy="50"
                r={45}
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="2 4"
                className="opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              <motion.circle
                cx="50"
                cy="50"
                r={32}
                fill="#1e1b4b"
                stroke="rgba(168, 85, 247, 0.5)"
                strokeWidth="1"
                animate={{
                  scale: isMounted ? [0.95, 1.05, 0.95] : 1,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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

          <div className="flex flex-col items-center gap-6">
             <motion.div
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="text-purple-400 font-mono text-xs tracking-[0.3em]"
             >
               SYNCING MODULES
             </motion.div>
             
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1 }}
               className="text-white text-[10px] uppercase font-light tracking-[0.8em]"
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
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"
      />
    </motion.div>
  );
}
