"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";

export default function ArcadeButton(): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-40"
    >
      <Link
        href="/play"
        aria-label="Play mini-games (just for fun)"
        title="Just for fun"
        className="group flex items-center rounded-full border border-line bg-paper/70 p-2.5 text-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-accent"
      >
        <Gamepad2 className="h-4 w-4 shrink-0" />
        {/* Quiet label — only revealed on hover */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium opacity-0 transition-all duration-300 group-hover:max-w-[6rem] group-hover:pl-1.5 group-hover:pr-0.5 group-hover:opacity-100">
          Just for fun
        </span>
      </Link>
    </motion.div>
  );
}
