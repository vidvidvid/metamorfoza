import Image from "next/image";

// Drobna zamegljena različica ozadja (24 px), da se stran ne pokaže prazna,
// preden se naloži polna slika požiralnika.
const BLUR =
  "data:image/webp;base64,UklGRgwBAABXRUJQVlA4WAoAAAAQAAAAFwAAJAAAQUxQSBQAAAABD/D+/4iIIBZM8pceQX9E/7MVAFZQOCDSAAAAcAYAnQEqGAAlAD7NVJ9Lp6SiobAKqPAZiWoAAEwSPIbeIzx0ledzSRg40hJeYPiEbJsGPlbsFfJtTlPQAP70kI3CvcwCBF48dYs+nWUGelZ7H1/1GdkxWDuqPMVa+3++lm/sByhwlDCT+1V/yOzmwhls3q72Q+Q52TIkTFjJU0hBIAHDU/7FYCwGajV1XxFhtrXw0QdxtAgdMOCQ4b5JvtswfmrHRcbh4RC/3kLcSAp0YJ9C/c5o575fYC4TS1N4Z7upWchR4oA0WsdRZ+3eAAAA";

// Mesnat požiralnik čez cel zaslon, zatemnjen za berljivost, z vijoličnim
// "blacklight" sijem na vrhu in lime pridihom na dnu.
export function ThroatBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 bg-background"
    >
      <Image
        src="/deep-throat/bg-throat.webp"
        alt=""
        fill
        sizes="100vw"
        preload
        placeholder="blur"
        blurDataURL={BLUR}
        className="scale-[1.04] object-cover object-center opacity-75"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.11 0.018 350 / 72%) 0%, oklch(0.11 0.018 350 / 38%) 40%, oklch(0.11 0.018 350 / 82%) 100%), radial-gradient(ellipse 70% 45% at 50% -5%, oklch(0.45 0.2 300 / 28%), transparent 70%), radial-gradient(ellipse 80% 40% at 50% 110%, oklch(0.85 0.18 115 / 12%), transparent 70%)",
        }}
      />
    </div>
  );
}
