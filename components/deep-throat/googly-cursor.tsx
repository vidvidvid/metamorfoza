"use client";

import { useEffect, useRef } from "react";

const EYE = 36;
const PUPIL = 16;
// Največji odmik zenice od sredine, da ostane v beločnici.
const MAX_OFFSET = (EYE - PUPIL) / 2 - 1;
const INTERACTIVE =
  "a, button, [role='button'], input, select, textarea, label, summary";

// Googly eye namesto kazalca: oko sledi miški, zenica pa je "ohlapna" - zaostaja
// za premiki, se zaziblje, ko se ustaviš, razširi nad povezavami in mežikne ob
// kliku. Samo za natančne kazalce (miška); na dotik in pri reduced-motion ni nič.
export function GooglyCursor() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    if (!eye || !pupil) return;

    document.documentElement.classList.add("googly");

    // Cilj (miška), položaj očesa in stanje zenice (odmik + hitrost).
    let px = -100;
    let py = -100;
    let ex = px;
    let ey = py;
    let ox = 0;
    let oy = 0;
    let vx = 0;
    let vy = 0;
    let visible = false;
    let raf = 0;
    let last = performance.now();

    const show = () => {
      if (visible) return;
      visible = true;
      eye.dataset.visible = "true";
    };
    const hide = () => {
      visible = false;
      delete eye.dataset.visible;
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!visible) {
        ex = px;
        ey = py;
        show();
      }
      const target = e.target as Element | null;
      const hovering = !!target?.closest?.(INTERACTIVE);
      if (hovering) eye.dataset.hover = "true";
      else delete eye.dataset.hover;
    };

    const onDown = (e: PointerEvent) => {
      if (!e.isPrimary) return;
      // Mežik + sunek zenice.
      eye.classList.remove("blink");
      void eye.offsetWidth; // restart animacije
      eye.classList.add("blink");
      vx += (Math.random() - 0.5) * 9;
      vy += (Math.random() - 0.5) * 9;
    };

    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) hide();
    };

    const tick = (now: number) => {
      // Normaliziramo na 60 fps, da fizika ne niha s hitrostjo zaslona.
      const dt = Math.min(2, (now - last) / 16.67);
      last = now;

      const prevX = ex;
      const prevY = ey;
      ex += (px - ex) * Math.min(1, 0.6 * dt);
      ey += (py - ey) * Math.min(1, 0.6 * dt);

      // Vztrajnost: zenica zaostane za premikom očesa ...
      vx -= (ex - prevX) * 0.35;
      vy -= (ey - prevY) * 0.35;
      // ... vzmet jo vleče nazaj (malo pod sredino, kot pri pravem googly eye) ...
      vx += ((0 - ox) * 0.08 - vx * 0.08) * dt;
      vy += ((2.5 - oy) * 0.08 - vy * 0.08) * dt;
      ox += vx * dt;
      oy += vy * dt;
      // ... in ob robu beločnice se odbije.
      const r = Math.hypot(ox, oy);
      if (r > MAX_OFFSET) {
        ox *= MAX_OFFSET / r;
        oy *= MAX_OFFSET / r;
        vx *= 0.45;
        vy *= 0.45;
      }

      eye.style.transform = `translate3d(${ex}px, ${ey}px, 0)`;
      pupil.style.transform = `translate(${ox}px, ${oy}px)`;
      raf = requestAnimationFrame(tick);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("googly");
    };
  }, []);

  return (
    <div ref={eyeRef} aria-hidden className="googly-eye">
      <div className="googly-ball">
        <div ref={pupilRef} className="googly-pupil-pos">
          <div className="googly-pupil" />
        </div>
      </div>
    </div>
  );
}
