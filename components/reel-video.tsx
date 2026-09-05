"use client";

import { useEffect, useRef } from "react";

// Reel je brez zvoka. React pri strežniškem renderju ne zapiše atributa
// `muted`, zato ga nastavimo ročno, sicer brskalniki blokirajo autoplay.
export function ReelVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl ring-1 ring-primary/40 shadow-[0_0_60px_oklch(0.63_0.26_348/25%)]">
      <video
        ref={ref}
        src="/deep-sea/reel.mp4"
        poster="/deep-sea/reel-poster.jpg"
        autoPlay
        loop
        playsInline
        muted
        preload="metadata"
        className="block aspect-[9/16] w-full bg-background object-cover"
      />
    </div>
  );
}
