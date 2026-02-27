"use client";

import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FaJsSquare, 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaAws 
} from "react-icons/fa";
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiMysql, 
  SiMongodb 
} from "react-icons/si";

export default function AnimatedTechSphere() {
  const rings = useMemo(() => [
    { rx: 220, ry: 60, duration: 20 },
    { rx: 300, ry: 85, duration: 30 },
    { rx: 380, ry: 110, duration: 45 },
  ], []);

  const userSkills = useMemo(() => [
    // Inner ring (0)
    { icon: <FaJsSquare size={18} />, color: "#F7DF1E", ring: 0, angle: 0 },
    { icon: <FaReact size={20} />, color: "#61DAFB", ring: 0, angle: 120 },
    { icon: <SiNextdotjs size={18} />, color: "#FFFFFF", ring: 0, angle: 240 },
    
    // Middle ring (1)
    { icon: <FaNodeJs size={20} />, color: "#339933", ring: 1, angle: 0 },
    { icon: <FaPython size={18} />, color: "#3776AB", ring: 1, angle: 90 },
    { icon: <SiTailwindcss size={20} />, color: "#06B6D4", ring: 1, angle: 180 },
    { icon: <SiTypescript size={16} />, color: "#3178C6", ring: 1, angle: 270 },

    // Outer ring (2)
    { icon: <FaAws size={20} />, color: "#FF9900", ring: 2, angle: 0 },
    { icon: <SiMysql size={22} />, color: "#00758F", ring: 2, angle: 120 },
    { icon: <SiMongodb size={18} />, color: "#47A248", ring: 2, angle: 240 },
  ], []);

  const getOrbitPaths = (rx: number, ry: number, startAngle: number) => {
    const x = [];
    const y = [];
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      // Rotating smoothly (clockwise)
      const angle = startAngle + (i * (360 / steps));
      const rad = (angle * Math.PI) / 180;
      x.push(Math.cos(rad) * rx);
      y.push(Math.sin(rad) * ry);
    }
    return { x, y };
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative w-full max-w-[900px] mx-auto flex justify-center mt-6 lg:mt-10 mb-6 lg:mb-10"
    >
      <svg viewBox="0 150 800 550" className="w-full h-auto max-h-[600px] sm:max-h-[700px] overflow-visible">
        <defs>
          <radialGradient id="glowPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
            <stop offset="50%" stopColor="rgba(147, 51, 234, 0.15)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" />
          </radialGradient>
          <filter id="blurGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Orbit Rings Configuration */}
        <g transform="translate(400, 480)">
          {/* Ring 3 - Outer */}
          <ellipse cx="0" cy="0" rx="380" ry="110" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" strokeDasharray="3 5" className="hidden sm:block" />
          <ellipse cx="0" cy="0" rx="340" ry="120" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" strokeDasharray="4 6" className="block sm:hidden" />
          
          {/* Ring 2 - Middle */}
          <ellipse cx="0" cy="0" rx="300" ry="85" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="2 4" className="hidden sm:block" />
          <ellipse cx="0" cy="0" rx="260" ry="90" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" strokeDasharray="3 5" className="block sm:hidden" />
          
          {/* Ring 1 - Inner */}
          <ellipse cx="0" cy="0" rx="220" ry="60" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" className="hidden sm:block" />
          
          {/* Mobile-only Ring - Inner Spread out */}
          <ellipse cx="0" cy="0" rx="180" ry="60" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" className="block sm:hidden" />
          
          {/* Decorative Elements */}
          <g transform="translate(-300, -50)" className="opacity-40">
            <circle r="4" fill="white" />
          </g>
          <g transform="translate(300, -80)" className="opacity-30">
            <rect width="8" height="8" fill="white" transform="rotate(45)" />
          </g>
        </g>

        {/* Central Orb */}
        <g transform="translate(400, 460)">
          {/* Backdrop purple hue glow */}
          <circle cx="0" cy="-20" r="180" fill="url(#glowPulse)" />
          
          {/* Core sphere core */}
          {mounted && (
            <motion.circle 
              cx="0" cy="-10" 
              r={mounted && typeof window !== 'undefined' && window.innerWidth < 640 ? 75 : 60} 
              fill="#4b1e7a" 
              filter="url(#blurGlow)"
              animate={{ 
                r: mounted && typeof window !== 'undefined' && window.innerWidth < 640 ? [70, 75, 70] : [55, 60, 55], 
                opacity: [0.8, 1, 0.8] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          
          <circle cx="0" cy="-10" r={mounted && typeof window !== 'undefined' && window.innerWidth < 640 ? 65 : 50} fill="rgba(88, 28, 135, 0.95)" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="1.5" />
          
          <g transform="translate(0, -10)">
            <motion.g
              animate={{ 
                scale: mounted && typeof window !== 'undefined' && window.innerWidth < 640 ? [1.2, 1.4, 1.2] : [1, 1.15, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <motion.path 
                d="M -15 -15 L 15 -15 M 15 -15 L -10 15 M -15 15 L 20 15" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                fill="none" 
                initial={{ pathLength: 0, opacity: 0.5 }}
                animate={{ 
                  pathLength: [0, 1, 1, 0],
                  opacity: [0.5, 1, 1, 0.5]
                }}
                transition={{ 
                  pathLength: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </motion.g>
          </g>
        </g>

        {/* Orbiting Icons */}
        <g transform="translate(400, 480)">
          {mounted && userSkills.map((skill, i) => {
            // Adaptive orbits for mobile
            const isMobile = mounted && typeof window !== 'undefined' && window.innerWidth < 640;
            const ringInfo = rings[skill.ring];
            
            // Adjust radius for mobile view - Spread out more
            const rx = isMobile ? (skill.ring === 0 ? 180 : skill.ring === 1 ? 260 : 340) : ringInfo.rx;
            const ry = isMobile ? (skill.ring === 0 ? 60 : skill.ring === 1 ? 90 : 120) : ringInfo.ry;
            
            const orbit = getOrbitPaths(rx, ry, skill.angle);
            
            // Mobile sizes
            const nodeSize = isMobile ? 24 : 18;
            const iconSize = isMobile ? 24 : 18;
            
            return (
              <motion.g
                key={`skill-${i}`}
                initial={{ x: orbit.x[0], y: orbit.y[0], opacity: 0 }}
                animate={{ x: orbit.x, y: orbit.y, opacity: 1 }}
                transition={{
                  x: { duration: ringInfo.duration, repeat: Infinity, ease: "linear" },
                  y: { duration: ringInfo.duration, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 1, delay: i * 0.1 }
                }}
              >
                {/* Node Background */}
                <circle cx="0" cy="0" r={nodeSize} fill="#140b23" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
                <circle cx="0" cy="0" r={nodeSize} fill={skill.color} opacity="0.1" />
                
                {/* SVG ForeignObject to render standard React components like react-icons */}
                <foreignObject x={-(iconSize/2 + 2)} y={-(iconSize/2 + 2)} width={iconSize + 4} height={iconSize + 4}>
                  <div className="w-full h-full flex items-center justify-center" style={{ color: skill.color }}>
                    {React.cloneElement(skill.icon as React.ReactElement<{ size: number }>, { size: iconSize })}
                  </div>
                </foreignObject>
              </motion.g>
            );
          })}
        </g>
      </svg>
    </motion.div>
  );
}
