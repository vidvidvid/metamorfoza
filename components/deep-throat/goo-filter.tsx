// SVG "gooey" filter (blur + kontrast alfe), ki zlije prekrivajoče se oblike v
// eno gmoto. Vedno naložen v Deep Throat layoutu; uporabljata ga ClickGoo
// (sluz ob kliku) in b2b blob na časovnici prek `filter: url(#goo)`.
export function GooFilter() {
  return (
    <svg aria-hidden className="absolute size-0">
      <defs>
        <filter id="goo" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
        {/* Gradienta za goo v glavi: lime -> rdeča (mehurček), rdeča -> črna (lovka). */}
        <linearGradient id="lg-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.25" stopColor="#c8dc3a" />
          <stop offset="0.8" stopColor="#8e2b1e" />
        </linearGradient>
        <linearGradient id="lg-grad-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8e2b1e" />
          <stop offset="0.85" stopColor="#3a1217" />
        </linearGradient>
      </defs>
    </svg>
  );
}
