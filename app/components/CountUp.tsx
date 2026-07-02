"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1.4,
}: CountUpProps): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration, mv]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
