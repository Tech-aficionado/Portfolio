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
    <div className="relative w-full max-w-[900px] mx-auto flex justify-center mt-10 mb-10 overflow-hidden">
      <svg viewBox="0 0 800 600" className="w-full h-auto max-h-[600px] overflow-visible">
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
          <ellipse cx="0" cy="0" rx="380" ry="110" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" strokeDasharray="3 5" />
          {/* Ring 2 - Middle */}
          <ellipse cx="0" cy="0" rx="300" ry="85" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeDasharray="2 4" />
          {/* Ring 1 - Inner */}
          <ellipse cx="0" cy="0" rx="220" ry="60" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
          
          {/* Floating static particles */}
          <g transform="translate(-380, 0)">
            <rect x="-6" y="-6" width="12" height="12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" transform="rotate(25)" />
            <rect x="-3" y="-3" width="6" height="6" fill="rgba(255,255,255,0.2)" />
          </g>
          <g transform="translate(380, 0)">
            <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="rgba(255,255,255,0.5)" />
          </g>
          <g transform="translate(-290, 30)">
            <polygon points="0,-8 7,4 -7,4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          </g>
        </g>

        {/* Central Orb */}
        <g transform="translate(400, 460)">
          {/* Backdrop purple hue glow */}
          <circle cx="0" cy="-20" r="220" fill="url(#glowPulse)" />
          
          {/* Core sphere matching screenshot */}
          {mounted && (
            <motion.circle 
              cx="0" cy="-10" r="75" 
              fill="#4b1e7a" 
              filter="url(#blurGlow)"
              animate={{ r: [70, 75, 70] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {!mounted && (
             <circle cx="0" cy="-10" r="75" fill="#4b1e7a" filter="url(#blurGlow)" />
          )}

          <circle cx="0" cy="-10" r="65" fill="rgba(88, 28, 135, 0.95)" stroke="rgba(168, 85, 247, 0.6)" strokeWidth="1.5" />
          
          {/* Central Logo 'Z' or 'Hourglass' symbol */}
          <g transform="translate(0, -10) scale(1.6)">
            <path d="M -15 -15 L 15 -15 M 15 -15 L -10 15 M -15 15 L 20 15" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </g>
        </g>

        {/* Orbiting Icons */}
        <g transform="translate(400, 480)">
          {mounted && userSkills.map((skill, i) => {
            const ringInfo = rings[skill.ring];
            const orbit = getOrbitPaths(ringInfo.rx, ringInfo.ry, skill.angle);
            
            return (
              <motion.g
                key={`skill-${i}`}
                initial={{ x: orbit.x[0], y: orbit.y[0] }}
                animate={{ x: orbit.x, y: orbit.y }}
                transition={{
                  duration: ringInfo.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Node Background */}
                <circle cx="0" cy="0" r="18" fill="#140b23" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="18" fill={skill.color} opacity="0.1" />
                
                {/* SVG ForeignObject to render standard React components like react-icons */}
                <foreignObject x="-12" y="-12" width="24" height="24">
                  <div className="w-full h-full flex items-center justify-center font-bold" style={{ color: skill.color }}>
                    {skill.icon}
                  </div>
                </foreignObject>
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
