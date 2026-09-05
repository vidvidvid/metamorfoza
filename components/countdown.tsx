"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

const TARGET = new Date(EVENT.startsAt).getTime();

const UNITS = [
  { label: "dni", ms: 1000 * 60 * 60 * 24 },
  { label: "ur", ms: 1000 * 60 * 60 },
  { label: "min", ms: 1000 * 60 },
  { label: "sek", ms: 1000 },
] as const;

function getParts(remaining: number) {
  let rest = Math.max(0, remaining);
  return UNITS.map((unit) => {
    const value = Math.floor(rest / unit.ms);
    rest -= value * unit.ms;
    return { label: unit.label, value };
  });
}

export function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(TARGET - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const isOver = remaining !== null && remaining <= 0;
  // Pred hidracijo prikažemo prazne vrednosti, da se strežnik in odjemalec ujemata.
  const parts = getParts(remaining ?? 0);

  if (isOver) {
    return (
      <p className="headline text-2xl sm:text-3xl">Potop se je začel</p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
        Do potopa
      </p>
      <div
        className="flex items-stretch justify-center gap-2 sm:gap-3"
        role="timer"
        aria-label="Odštevanje do začetka dogodka"
      >
        {parts.map((part, i) => (
          <div key={part.label} className="flex items-stretch gap-2 sm:gap-3">
            <div className="flex min-w-[3.5rem] flex-col items-center rounded-lg border border-primary/30 bg-card/70 px-2 py-2.5 backdrop-blur-sm sm:min-w-[4.5rem] sm:px-3 sm:py-3">
              <span className="font-heading text-2xl font-black tabular-nums text-primary sm:text-3xl">
                {remaining === null
                  ? "––"
                  : String(part.value).padStart(2, "0")}
              </span>
              <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground sm:text-xs">
                {part.label}
              </span>
            </div>
            {i < parts.length - 1 && (
              <span
                aria-hidden
                className="self-center font-mono text-xl text-primary/40 sm:text-2xl"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
