"use client";

import { useEffect, useState } from "react";

type Burst = {
  id: number;
  x: number;
  y: number;
  size: number;
  rise: number;
  sway: number;
  duration: number;
  delay: number;
  opacity: number;
  hue: number;
  ttl: number;
};

// Odtenki iz palete: roza, cian, vijolična, bioluminiscenčna zelena, modra.
const HUES = [348, 230, 290, 160, 200, 320, 260];

const r = (min: number, max: number) => min + Math.random() * (max - min);

// Ob vsakem kliku/dotiku se iz točke dvigne naključen šop mehurčkov.
export function ClickBubbles() {
  const [bubbles, setBubbles] = useState<Burst[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let nextId = 0;

    const spawn = (e: PointerEvent) => {
      // Samo primarni gumb / dotik; ne za desni klik ali sekundarne prste.
      if (!e.isPrimary || e.button !== 0) return;
      const count = Math.round(r(7, 16));
      const burst: Burst[] = Array.from({ length: count }, () => {
        const duration = r(1.1, 2.6);
        const delay = r(0, 0.28);
        return {
          id: nextId++,
          x: e.clientX + r(-14, 14),
          y: e.clientY + r(-10, 10),
          size: r(10, 48) * (Math.random() < 0.18 ? 1.7 : 1),
          hue: HUES[Math.floor(Math.random() * HUES.length)] + r(-12, 12),
          rise: r(90, 320),
          sway: r(-70, 70),
          duration,
          delay,
          opacity: r(0.55, 0.95),
          ttl: (duration + delay) * 1000 + 60,
        };
      });
      setBubbles((prev) => [...prev, ...burst]);
      const maxTtl = Math.max(...burst.map((b) => b.ttl));
      const ids = new Set(burst.map((b) => b.id));
      window.setTimeout(
        () => setBubbles((prev) => prev.filter((b) => !ids.has(b.id))),
        maxTtl,
      );
    };

    document.addEventListener("pointerdown", spawn, { passive: true });
    return () => document.removeEventListener("pointerdown", spawn);
  }, []);

  if (bubbles.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble bubble-burst"
          style={
            {
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              "--burst-rise": `${b.rise}px`,
              "--burst-sway": `${b.sway}px`,
              "--burst-duration": `${b.duration}s`,
              "--burst-delay": `${b.delay}s`,
              "--bubble-opacity": b.opacity,
              "--h": b.hue,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
