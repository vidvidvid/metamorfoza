import Image from "next/image";

// Drobna zamegljena različica ozadja (24 px), da se stran ne pokaže prazna,
// preden se naloži polna slika.
const BLUR =
  "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAABwBQCdASoYACIAPs1Wo0unpSMhsBVdUPAZiUAY/Izu0W2wSYK/aN0viTAakTxc1FIQulDAAP742CR91L93yDpuZgjg2TkflrzYKcxueZW/rhp4/4WpUw5VhPlc35rHtZ4BPKGUo6mUGKtSQKkdBBJuZAmfMjC8DzmbgAAA";

export function SeaBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
      <Image
        src="/deep-sea/bg-seafloor.webp"
        alt=""
        fill
        sizes="100vw"
        preload
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover object-bottom"
      />
      {/* Temnejši vrh za berljivost, roza/cian pridih na dnu. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.13 0.035 245 / 55%) 0%, oklch(0.13 0.035 245 / 25%) 45%, oklch(0.13 0.035 245 / 60%) 100%), radial-gradient(ellipse 80% 50% at 50% 110%, oklch(0.63 0.26 348 / 18%), transparent 70%)",
        }}
      />
    </div>
  );
}
