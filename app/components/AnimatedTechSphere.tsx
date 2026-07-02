"use client";

import React, { useMemo } from "react";
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaPython,
  FaAws,
  FaAngular,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMysql,
  SiMongodb,
} from "react-icons/si";

interface Tech {
  name: string;
  icon: React.ReactNode;
}

// Light-theme skills marquee (replaces the previous dark orbiting sphere)
export default function AnimatedTechSphere() {
  const techs = useMemo<Tech[]>(
    () => [
      { name: "JavaScript", icon: <FaJsSquare /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Angular", icon: <FaAngular /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Python", icon: <FaPython /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "AWS", icon: <FaAws /> },
    ],
    []
  );

  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...techs, ...techs];

  return (
    <div className="marquee-mask overflow-hidden py-2">
      <div className="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
        {loop.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-paper px-5 py-4 transition-colors hover:border-accent/40 hover:bg-accent-soft/50"
          >
            <span className="text-2xl text-ink/70 transition-colors group-hover:text-accent">
              {tech.icon}
            </span>
            <span className="text-sm font-medium text-ink whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
