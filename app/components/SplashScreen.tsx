"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timeout = setTimeout(() => finishLoading(), 3000);
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  const logoVariant: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const pathVariant: Variants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0514]"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Signature Logo with Masking Effect */}
        <div className="relative h-32 flex items-center justify-center">
          <svg
            width="400"
            height="120"
            viewBox="0 0 400 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <defs>
              <linearGradient id="signatureGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>

              {/* The Mask that reveals the text */}
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

            {/* Background Glow Text */}
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

            {/* The Actual Text revealed by the mask */}
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

        {/* Loading progress indicator */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-medium"
          >
            Initializing Interface
          </motion.div>
          
          <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: [0.45, 0, 0.55, 1] }}
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>
        </div>
      </div>
      
      {/* Dynamic Background Elements */}
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
