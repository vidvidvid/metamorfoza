import { Rock_Salt, Sedgwick_Ave_Display, Lacquer } from "next/font/google";
import { SeaBackground } from "@/components/deep-sea/sea-background";
import { Bubbles } from "@/components/deep-sea/bubbles";
import { ClickBubbles } from "@/components/deep-sea/click-bubbles";

// Rock Salt: marker handstyle za tekoči trak in dress code. Nima čšž.
const rockSalt = Rock_Salt({
  variable: "--font-rock-salt",
  subsets: ["latin"],
  weight: "400",
});

// Sedgwick Ave Display: wildstyle grafit za naslove (ima čšž).
const sedgwick = Sedgwick_Ave_Display({
  variable: "--font-sedgwick",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

// Lacquer: sprej s kapljami za poudarke (ZASTONJ). Brez čšž.
const lacquer = Lacquer({
  variable: "--font-lacquer",
  subsets: ["latin"],
  weight: "400",
});

// Arhiv: Metamorfoza Vol. 3: Deep Sea. Ovoj `.edition-deep-sea` preklopi
// barvno temo (app/styles/deep-sea.css), morsko ozadje in mehurčki so samo tu.
export default function DeepSeaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${rockSalt.variable} ${sedgwick.variable} ${lacquer.variable} edition-deep-sea flex flex-1 flex-col bg-background text-foreground`}
    >
      <SeaBackground />
      <Bubbles />
      <ClickBubbles />
      {children}
    </div>
  );
}
