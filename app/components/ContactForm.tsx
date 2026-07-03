"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL = "shivansh.goela12@gmail.com";

const SUGGESTIONS: { label: string; text: string }[] = [
  {
    label: "💼 Project inquiry",
    text: "Hi Shivansh, I'm working on a web app idea and I'm looking for a full-stack developer to help bring it to life. Do you have availability to discuss the scope and timeline?",
  },
  {
    label: "🧑‍💻 Hiring / role",
    text: "Hi Shivansh, we're hiring and your work caught our attention. I'd love to chat about a potential role — what's the best way to share the details?",
  },
  {
    label: "🤝 Collaboration",
    text: "Hey Shivansh, I have a project I think we could collaborate on. Would you be open to a quick call to explore it together?",
  },
  {
    label: "👋 Just saying hi",
    text: "Hi Shivansh, I came across your portfolio and really liked it! Just wanted to reach out and connect.",
  },
];

export default function ContactForm(): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const bodyText = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${bodyText}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      if (data.fallback) openMailto();
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Network error. Try emailing directly.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-paper/20 bg-paper/5 px-4 py-3 text-sm text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-accent";

  return (
    <div className="rounded-2xl border border-paper/15 bg-paper/5 p-5 sm:p-6 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-3 py-8 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-paper">
              <Check className="h-6 w-6" />
            </span>
            <p className="font-display text-xl text-paper">Message on its way!</p>
            <p className="text-sm text-paper/60">
              Thanks for reaching out — I&apos;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm text-accent hover:underline"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            className="space-y-3"
          >
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label>
                Company
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="Your name"
              />
              <input
                className={inputClass}
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Your email"
              />
            </div>
            <textarea
              className={`${inputClass} min-h-[110px] resize-y`}
              placeholder="Tell me about your project…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              aria-label="Message"
            />

            {/* Quick-fill suggestions */}
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-paper/40">
                Not sure what to say? Try one:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setMessage(s.text)}
                    className="rounded-full border border-paper/20 bg-paper/5 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-accent hover:text-accent"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {status === "error" && (
              <p className="text-sm text-accent">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-paper disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
