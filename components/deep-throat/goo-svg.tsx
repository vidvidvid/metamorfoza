import { cn } from "@/lib/utils";

// Goo kot inline SVG. Vse oblike v skupini s filtrom #goo (GooFilter v layoutu)
// se zlijejo v eno gmoto. Namenoma SVG in ne HTML: WebKit (iOS Safari) iz SVG
// filtra izloči HTML elemente z animiranim transformom, SVG oblike pa ne.
// Animacije v app/styles/deep-throat.css uporabljajo samo `transform`
// (ne `translate`/`rotate`/`scale` lastnosti - tudi te WebKit izloči).

/* Dolžine lovk v px (1rem = 16px): namizje 9.5rem, telefon 2.4rem / 4.8rem. */
const B2B = { d: { a: 152, b: 152 }, m: { a: 38, b: 77 } };

/* Most iz sluzi med b2b parom: lovki ves čas povezujeta imeni, po njiju
   potujejo grude, v sredini utripa glavni mehurček z napisom. Pod md je
   skupina zavrtena za 90° (lovki gor in dol). Vsak par ima svoj ritem. */
export function B2BGoo({ variant }: { variant: number }) {
  return (
    <span
      role="img"
      aria-label="b2b"
      className={cn(
        "b2b-goo justify-self-center md:col-start-2 md:row-span-2 md:row-start-1 md:-mt-4 md:self-start",
        variant % 2 === 0 ? "b2b-goo-even" : "b2b-goo-odd",
      )}
    >
      <svg
        aria-hidden
        className="b2b-goo-svg"
        width={360}
        height={200}
        viewBox="-180 -100 360 200"
      >
        <g className="b2b-rot">
          <g filter="url(#goo)">
            {(["d", "m"] as const).map((bp) => (
              <g key={bp} className={bp === "d" ? "b2b-d" : "b2b-m"}>
                <rect
                  className="b2b-tendril b2b-tendril-a"
                  x={-B2B[bp].a}
                  y={-6.8}
                  width={B2B[bp].a}
                  height={13.6}
                  rx={6.8}
                />
                <rect
                  className="b2b-tendril b2b-tendril-b"
                  x={0}
                  y={-6.8}
                  width={B2B[bp].b}
                  height={13.6}
                  rx={6.8}
                />
                <circle className="b2b-tip" cx={-B2B[bp].a + 6} cy={0} r={10.4} />
                <circle
                  className="b2b-tip b2b-tip-b"
                  cx={B2B[bp].b - 6}
                  cy={0}
                  r={10.4}
                />
                <circle
                  className="b2b-flow b2b-flow-1"
                  cx={0}
                  cy={0}
                  r={8.4}
                  style={
                    { "--ta": `${B2B[bp].a}px`, "--tb": `${B2B[bp].b}px` } as React.CSSProperties
                  }
                />
                <circle
                  className="b2b-flow b2b-flow-2"
                  cx={0}
                  cy={0}
                  r={6.8}
                  style={
                    { "--ta": `${B2B[bp].a}px`, "--tb": `${B2B[bp].b}px` } as React.CSSProperties
                  }
                />
                <circle
                  className="b2b-flow b2b-flow-3"
                  cx={0}
                  cy={0}
                  r={5.6}
                  style={
                    { "--ta": `${B2B[bp].a}px`, "--tb": `${B2B[bp].b}px` } as React.CSSProperties
                  }
                />
              </g>
            ))}
            <circle className="b2b-blob b2b-blob-2" cx={0} cy={0} r={9.6} />
            <circle className="b2b-blob b2b-blob-3" cx={0} cy={0} r={7.2} />
            <ellipse className="b2b-blob b2b-blob-1" cx={0} cy={0} rx={20} ry={20} />
          </g>
        </g>
      </svg>
      <span aria-hidden className="b2b-goo-label">
        b2b
      </span>
    </span>
  );
}

/* Glava: Metamorfoza ~ goo ~ Channel Zero kot en SVG na breakpoint. Logotip
   Metamorfoze je v isti filtrirani skupini kot goo, zato se lovka z njim
   zlije; Channel Zero je zunaj (ostre konice), temna lovka se podvije pod
   emblem. Na telefonu (navpično) je goo za logotipom. */
const META = { w: 460, h: 155.6 };
const CH0 = { w: 460, h: 78.2 };

export function LogoLockup() {
  return (
    <div className="logo-lockup mb-12 sm:mb-14">
      {/* Namizje: vodoravno. Logotip Metamorfoze potisnjen dol, da most teče skozi črke. */}
      <svg
        className="logo-lockup-svg mx-auto hidden h-auto w-full max-w-[1040px] sm:block"
        viewBox="0 0 1140 290"
        role="img"
        aria-label="Metamorfoza × Channel Zero"
      >
        <image
          className="logo-ch0"
          href="/deep-throat/ch0-logo.webp"
          x={680}
          y={(290 - CH0.h) / 2}
          width={CH0.w}
          height={CH0.h}
        />
        <g filter="url(#goo)" style={{ "--ta": "170px", "--tb": "157px" } as React.CSSProperties}>
          <image
            href="/deep-throat/logo.webp"
            x={0}
            y={76}
            width={META.w}
            height={META.h}
          />
          <g transform="translate(570 145)">
            <LockupGoo ta={170} tb={157} drips />
          </g>
        </g>
      </svg>

      {/* Telefon: navpično, goo za logotipoma. */}
      <svg
        className="logo-lockup-svg mx-auto block h-auto w-full max-w-[460px] sm:hidden"
        viewBox="0 0 460 440"
        role="img"
        aria-label="Metamorfoza × Channel Zero"
      >
        <g filter="url(#goo)" style={{ "--ta": "112px", "--tb": "150px" } as React.CSSProperties}>
          <g transform="translate(230 236) rotate(90)">
            <LockupGoo ta={112} tb={150} />
          </g>
          <image href="/deep-throat/logo.webp" x={0} y={0} width={META.w} height={META.h} />
        </g>
        <image
          className="logo-ch0"
          href="/deep-throat/ch0-logo.webp"
          x={0}
          y={440 - CH0.h}
          width={CH0.w}
          height={CH0.h}
        />
      </svg>
    </div>
  );
}

/* Goo v glavi okoli izhodišča (0,0): lovka a (lime) proti Metamorfozi v -x,
   lovka b (rdeča -> črna) proti Channel Zeru v +x. */
function LockupGoo({ ta, tb, drips = false }: { ta: number; tb: number; drips?: boolean }) {
  return (
    <>
      <rect className="lg-tendril lg-tendril-a" x={-ta} y={-7.6} width={ta} height={15.2} rx={7.6} />
      <rect className="lg-tendril lg-tendril-b" x={0} y={-7.6} width={tb} height={15.2} rx={7.6} />
      <circle className="lg-tip lg-tip-a" cx={-ta + 8} cy={0} r={12} />
      <circle className="lg-tip lg-tip-b" cx={tb - 8} cy={0} r={12} />
      <circle className="lg-flow lg-flow-1" cx={0} cy={0} r={8} />
      <circle className="lg-flow lg-flow-2" cx={0} cy={0} r={6.4} />
      <circle className="lg-flow lg-flow-3" cx={0} cy={0} r={5.2} />
      {drips && (
        <>
          <ellipse className="lg-drip lg-drip-1" cx={-ta * 0.55} cy={0} rx={6.4} ry={7.2} />
          <ellipse className="lg-drip lg-drip-2" cx={22} cy={0} rx={6.4} ry={7.2} />
          <ellipse className="lg-drip lg-drip-3" cx={tb * 0.7} cy={0} rx={6.4} ry={7.2} />
        </>
      )}
      <circle className="lg-sat" cx={0} cy={0} r={8.8} />
      <ellipse className="lg-blob" cx={0} cy={0} rx={22.4} ry={22.4} />
    </>
  );
}
