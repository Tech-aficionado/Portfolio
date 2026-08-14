"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}

// useLayoutEffect would warn during SSR; on the server we never run the reset.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1.4,
}: CountUpProps): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(0);

  // Seed with the REAL value so the prerendered HTML, crawlers, social scrapers
  // and no-JS visitors all read the final number instead of a zero.
  const [display, setDisplay] = useState(value.toFixed(decimals));
  const [animatable, setAnimatable] = useState(false);

  // Runs before the browser paints, so dropping back to zero to start the
  // count-up is never visible as a flash of the final value.
  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setDisplay((0).toFixed(decimals));
    setAnimatable(true);
  }, [decimals]);

  useEffect(() => {
    if (!animatable || !inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [animatable, inView, value, decimals, duration, mv]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
