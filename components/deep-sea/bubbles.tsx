function rand(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function Bubbles({ count = 28 }: { count?: number }) {
  const bubbles = Array.from({ length: count }, (_, i) => {
    const left = rand(i + 1) * 100;
    const size = 6 + rand(i + 100) * 32;
    const duration = 12 + rand(i + 200) * 16;
    const delay = -rand(i + 300) * duration;
    const sway = (rand(i + 400) - 0.5) * 80;
    const opacity = 0.18 + rand(i + 500) * 0.32;
    return { left, size, duration, delay, sway, opacity, key: i };
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {bubbles.map((b) => (
        <span
          key={b.key}
          className="bubble"
          style={
            {
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              "--bubble-duration": `${b.duration}s`,
              "--bubble-delay": `${b.delay}s`,
              "--bubble-sway": `${b.sway}px`,
              "--bubble-opacity": b.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
