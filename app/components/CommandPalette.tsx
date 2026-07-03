"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Copy,
  Gamepad2,
  Github,
  Home,
  Instagram,
  Linkedin,
  Moon,
  Sun,
} from "lucide-react";

interface Action {
  id: string;
  label: string;
  hint: string;
  keywords: string;
  icon: React.ReactNode;
  run: () => void;
}

const EMAIL = "shivansh.goela12@gmail.com";

export default function CommandPalette(): React.JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const goto = useCallback(
    (id: string) => {
      close();
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    },
    [close]
  );

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, []);

  const actions = useMemo<Action[]>(
    () => [
      { id: "home", label: "Home", hint: "Top of page", keywords: "start hero top", icon: <Home className="h-4 w-4" />, run: () => goto("home") },
      { id: "about", label: "About", hint: "The mission", keywords: "bio intro", icon: <ArrowRight className="h-4 w-4" />, run: () => goto("about") },
      { id: "services", label: "Expertise", hint: "What I do", keywords: "skills services capabilities", icon: <ArrowRight className="h-4 w-4" />, run: () => goto("services") },
      { id: "experience", label: "Experience", hint: "Where I've worked", keywords: "work job career", icon: <ArrowRight className="h-4 w-4" />, run: () => goto("experience") },
      { id: "lab", label: "Selected Work", hint: "Projects", keywords: "projects lab portfolio ghostrelay", icon: <ArrowRight className="h-4 w-4" />, run: () => goto("lab") },
      { id: "contact", label: "Contact", hint: "Get in touch", keywords: "email hire connect", icon: <ArrowRight className="h-4 w-4" />, run: () => goto("contact") },
      { id: "arcade", label: "Play the arcade", hint: "Mini-games", keywords: "games fun play", icon: <Gamepad2 className="h-4 w-4" />, run: () => { close(); router.push("/play"); } },
      { id: "theme", label: "Toggle theme", hint: "Light / dark", keywords: "dark light mode appearance", icon: <span className="relative inline-flex h-4 w-4 shrink-0 items-center justify-center"><Sun className="absolute h-4 w-4 dark:hidden" /><Moon className="absolute hidden h-4 w-4 dark:block" /></span>, run: () => { toggleTheme(); } },
      { id: "email", label: copied ? "Copied!" : "Copy email", hint: EMAIL, keywords: "mail contact", icon: copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />, run: copyEmail },
      { id: "github", label: "GitHub", hint: "@Tech-aficionado", keywords: "code repos", icon: <Github className="h-4 w-4" />, run: () => window.open("https://github.com/Tech-aficionado", "_blank") },
      { id: "linkedin", label: "LinkedIn", hint: "Connect", keywords: "network", icon: <Linkedin className="h-4 w-4" />, run: () => window.open("https://www.linkedin.com/in/shivansh-goel-5b2309174/", "_blank") },
      { id: "instagram", label: "Instagram", hint: "@shivanxx.__", keywords: "social", icon: <Instagram className="h-4 w-4" />, run: () => window.open("https://www.instagram.com/shivanxx.__/", "_blank") },
    ],
    [goto, close, router, toggleTheme, copyEmail, copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.keywords.includes(q)
    );
  }, [query, actions]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[index]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/40 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="text-muted">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 text-base text-ink outline-none placeholder:text-muted"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <kbd className="hidden rounded border border-line px-1.5 py-0.5 text-[10px] text-muted sm:block">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted">No results.</p>
              )}
              {filtered.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  onMouseEnter={() => setIndex(i)}
                  onClick={a.run}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === index ? "bg-accent-soft text-accent" : "text-ink"
                  }`}
                >
                  <span className={i === index ? "text-accent" : "text-muted"}>{a.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{a.label}</span>
                  </span>
                  <span className="truncate text-xs text-muted">{a.hint}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
