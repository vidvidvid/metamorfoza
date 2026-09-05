"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

// React pri strežniškem renderju ne zapiše atributa `muted`, zato ga
// nastavimo ročno, sicer brskalniki blokirajo samodejno predvajanje.
export function ReelVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  function toggle() {
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (el.paused) el.play().catch(() => {});
  }

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
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? "Vklopi zvok" : "Izklopi zvok"}
        className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
}
