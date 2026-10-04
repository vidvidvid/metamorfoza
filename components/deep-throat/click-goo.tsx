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
  /** #goo-debug: zamrznjen izbruh na sredini zaslona za pregled v brskalnikih. */
  debug?: boolean;
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
// Packa, niti in kaplje so SVG oblike v skupini s filtrom #goo (GooFilter),
// ki jih zlije v eno gmoto. SVG namenoma: WebKit (iOS) iz filtra izloči HTML
// elemente z animiranim transformom, SVG oblike pa ne.
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
        {
          id,
          x: e.clientX,
          y: e.clientY,
          l,
          c,
          h,
          splat: r(48, 76),
          drips,
          specks,
        },
      ]);
      window.setTimeout(
        () => setBursts((prev) => prev.filter((b) => b.id !== id)),
        ttl,
      );
    };

    document.addEventListener("pointerdown", spawn, { passive: true });

    // Razhroščevanje (npr. iOS simulator, kjer dotiki ne pridejo do strani):
    // /#goo-debug nariše en izbruh na sredini in ga zamrzne (glej .goo-debug).
    let debugTimer = 0;
    if (window.location.hash === "#goo-debug") {
      const [l, c, h] = COLORS[0];
      debugTimer = window.setTimeout(
        () =>
          setBursts([
            {
              id: -1,
              x: window.innerWidth / 2,
              y: window.innerHeight / 3,
              l,
              c,
              h,
              splat: 64,
              debug: true,
              drips: [
                {
                  id: 0,
                  dx: -18,
                  fall: 160,
                  width: 8,
                  size: 20,
                  duration: 1.6,
                  delay: 0.1,
                },
                {
                  id: 1,
                  dx: 6,
                  fall: 220,
                  width: 6,
                  size: 16,
                  duration: 2,
                  delay: 0.3,
                },
                {
                  id: 2,
                  dx: 22,
                  fall: 110,
                  width: 9,
                  size: 22,
                  duration: 1.3,
                  delay: 0.2,
                },
              ],
              specks: [],
            },
          ]),
        0,
      );
    }

    return () => {
      window.clearTimeout(debugTimer);
      document.removeEventListener("pointerdown", spawn);
    };
  }, []);

  if (bursts.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {bursts.map((b) => (
        <div
          key={b.id}
          className={b.debug ? "goo-burst goo-debug" : "goo-burst"}
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
          <svg
            className="goo-gooey"
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
          >
            <g filter="url(#goo)">
              <ellipse
                className="goo-splat"
                cx={ORIGIN_X}
                cy={ORIGIN_Y}
                rx={b.splat / 2}
                ry={b.splat * 0.4}
              />
              {b.drips.map((d) => (
                <g
                  key={d.id}
                  transform={`translate(${ORIGIN_X + d.dx} ${ORIGIN_Y})`}
                  style={
                    {
                      "--fall": `${d.fall}px`,
                      "--dur": `${d.duration}s`,
                      "--delay": `${d.delay}s`,
                    } as React.CSSProperties
                  }
                >
                  <rect
                    className="goo-strand"
                    x={-d.width / 2}
                    y={0}
                    width={d.width}
                    height={d.fall}
                    rx={d.width / 2}
                  />
                  <ellipse
                    className="goo-drop"
                    cx={0}
                    cy={0}
                    rx={d.size / 2}
                    ry={d.size * 0.575}
                  />
                </g>
              ))}
            </g>
            {/* Lesk na packi, zunaj filtra, da ostane oster. */}
            <ellipse
              className="goo-splat goo-gloss"
              cx={ORIGIN_X - b.splat * 0.16}
              cy={ORIGIN_Y - b.splat * 0.14}
              rx={b.splat * 0.19}
              ry={b.splat * 0.12}
            />
          </svg>
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
