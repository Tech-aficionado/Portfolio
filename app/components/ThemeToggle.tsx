"use client";

import { useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

/**
 * Subscribe to the prefers-color-scheme media query AND manual class changes.
 * We fire listeners whenever the <html> class might have changed.
 */
function subscribeTheme(onStoreChange: () => void): () => void {
  // Listen for OS-level theme changes
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMq = (e: MediaQueryListEvent) => {
    let hasManualChoice = false;
    try {
      hasManualChoice = !!localStorage.getItem("theme");
    } catch {
      /* ignore */
    }
    if (hasManualChoice) return;
    document.documentElement.classList.toggle("dark", e.matches);
    onStoreChange();
  };
  mq.addEventListener("change", handleMq);

  // Listen for class mutations on <html> to catch toggle() calls
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => {
    mq.removeEventListener("change", handleMq);
    observer.disconnect();
  };
}

function getThemeSnapshot(): boolean {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot(): boolean {
  // On the server we return false; the component renders nothing until
  // hydrated (canUseDOM check below), so the value is irrelevant and stable.
  return false;
}

/**
 * Detects whether we're on the client. useSyncExternalStore's getSnapshot
 * runs on the client only after hydration, but the component still renders
 * on the server where we must suppress the icon to avoid a mismatch.
 */
function useHasMounted(): boolean {
  return useSyncExternalStore(
    // subscribe: nothing to subscribe to — mounted never changes once true
    () => () => {},
    // client snapshot
    () => true,
    // server snapshot
    () => false,
  );
}

export default function ThemeToggle(): React.JSX.Element {
  const mounted = useHasMounted();
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {mounted && (
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </motion.span>
      )}
    </button>
  );
}
