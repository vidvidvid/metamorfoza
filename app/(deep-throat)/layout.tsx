import { Rubik_Wet_Paint, Nosifer, Baloo_2 } from "next/font/google";
import { ThroatBackground } from "@/components/deep-throat/throat-background";
import { GooFilter } from "@/components/deep-throat/goo-filter";
import { ClickGoo } from "@/components/deep-throat/click-goo";
import { GooglyCursor } from "@/components/deep-throat/googly-cursor";

// Rubik Wet Paint: težka groteska, s katere kaplja sluz - naslovi (ima čšž).
const wetPaint = Rubik_Wet_Paint({
  variable: "--font-wet-paint",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

// Nosifer: horror drip, samo velike črke - tekoči trak, ZASTONJ, noga (ima čšž).
const nosifer = Nosifer({
  variable: "--font-nosifer",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

// Baloo 2: zaobljena in mehka kot magenta napisi "best costume contest!!!" (ima čšž).
const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "latin-ext"],
});

// Metamorfoza Vol. 4: Deep Throat - trenutna edicija na `/`.
// Barvna tema je v .dark (globals.css); tu samo pisave, ozadje in sluz ob kliku (ClickGoo) in googly eye kazalec.
export default function DeepThroatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${wetPaint.variable} ${nosifer.variable} ${baloo.variable} edition-deep-throat flex flex-1 flex-col`}
    >
      <ThroatBackground />
      <GooFilter />
      <ClickGoo />
      <GooglyCursor />
      {children}
    </div>
  );
}
