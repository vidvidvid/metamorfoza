"use client";

import { useEffect, useState } from "react";

type Drip = {
  id: number;
  dx: number;
  fall: number;
  width: number;
  size: number;
  duration: number;
  delay: number;
};

type Speck = {
  id: number;
  dx: number;
  dy: number;
  size: number;
  duration: number;
};

type Burst = {
  id: number;
  x: number;
  y: number;
  /** oklch komponente barve sluzi (l, c, h). */
  l: number;
  c: number;
  h: number;
  splat: number;
  drips: Drip[];
  specks: Speck[];
};

// Lime (2x), magenta, meso, strupena zelena.
const COLORS: [number, number, number][] = [
  [0.85, 0.18, 115],
  [0.85, 0.18, 115],
  [0.66, 0.23, 347],
  [0.76, 0.1, 358],
  [0.8, 0.2, 140],
];

// Velikost polja ene sluzi; packa je pri (ORIGIN_X, ORIGIN_Y), kaplje tečejo navzdol.
const W = 360;
const H = 480;
const ORIGIN_X = 180;
const ORIGIN_Y = 90;

const r = (min: number, max: number) => min + Math.random() * (max - min);

// Ob vsakem kliku/dotiku prileti packa sluzi, se razlije in pocedi navzdol.
// Filter #goo (GooFilter v layoutu) zlije packo, niti in kaplje v eno gmoto,
// da se niti raztegnejo in odtrgajo kot prava sluz.
export function ClickGoo() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let nextId = 0;

    const spawn = (e: PointerEvent) => {
      // Samo primarni gumb / dotik; ne za desni klik ali sekundarne prste.
      if (!e.isPrimary || e.button !== 0) return;
      const id = nextId++;
      const [l, c, h] = COLORS[Math.floor(Math.random() * COLORS.length)];

      const drips: Drip[] = Array.from(
        { length: Math.round(r(3, 6)) },
        (_, i) => ({
          id: i,
          dx: r(-24, 24),
          fall: r(70, 250),
          width: r(5, 10),
          size: r(12, 24),
          duration: r(1.1, 2.2),
          delay: r(0.05, 0.5),
        }),
      );

      const specks: Speck[] = Array.from(
        { length: Math.round(r(5, 9)) },
        (_, i) => {
          const angle = r(0, Math.PI * 2);
          const dist = r(30, 110);
          return {
            id: i,
            dx: Math.cos(angle) * dist,
            dy: Math.sin(angle) * dist * 0.7 + 18,
            size: r(3, 8),
            duration: r(0.45, 0.9),
          };
        },
      );

      const ttl =
        Math.max(...drips.map((d) => d.duration + d.delay)) * 1000 + 1000;

      setBursts((prev) => [
        ...prev,
        { id, x: e.clientX, y: e.clientY, l, c, h, splat: r(48, 76), drips, specks },
      ]);
      window.setTimeout(
        () => setBursts((prev) => prev.filter((b) => b.id !== id)),
        ttl,
      );
    };

    document.addEventListener("pointerdown", spawn, { passive: true });
    return () => document.removeEventListener("pointerdown", spawn);
  }, []);

  if (bursts.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bursts.map((b) => (
        <div
          key={b.id}
          className="goo-burst"
          style={
            {
              left: b.x - ORIGIN_X,
              top: b.y - ORIGIN_Y,
              width: W,
              height: H,
              "--goo-l": b.l,
              "--goo-c": b.c,
              "--goo-h": b.h,
            } as React.CSSProperties
          }
        >
          <div className="goo-gooey">
            <span
              className="goo-splat"
              style={{ width: b.splat, height: b.splat * 0.8 }}
            />
            {b.drips.map((d) => (
              <span
                key={d.id}
                className="goo-drip"
                style={
                  {
                    left: ORIGIN_X + d.dx,
                    top: ORIGIN_Y,
                    "--fall": `${d.fall}px`,
                    "--w": `${d.width}px`,
                    "--size": `${d.size}px`,
                    "--dur": `${d.duration}s`,
                    "--delay": `${d.delay}s`,
                  } as React.CSSProperties
                }
              >
                <span className="goo-strand" />
                <span className="goo-drop" />
              </span>
            ))}
          </div>
          {b.specks.map((s) => (
            <span
              key={s.id}
              className="goo-speck"
              style={
                {
                  left: ORIGIN_X,
                  top: ORIGIN_Y,
                  width: s.size,
                  height: s.size,
                  "--dx": `${s.dx}px`,
                  "--dy": `${s.dy}px`,
                  "--dur": `${s.duration}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
