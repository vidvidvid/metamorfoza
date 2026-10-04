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
      </defs>
    </svg>
  );
}
