"use client";

import { useEffect, useState } from "react";

export default function LocalTime(): React.JSX.Element {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 text-sm text-paper/60">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {time ? `${time} in India (IST)` : "\u00A0"}
    </span>
  );
}
