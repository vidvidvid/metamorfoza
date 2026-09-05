import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Rubik,
  Rock_Salt,
  Sedgwick_Ave_Display,
  Lacquer,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Bubbles } from "@/components/bubbles";
import { ClickBubbles } from "@/components/click-bubbles";
import { SeaBackground } from "@/components/sea-background";
import { EVENT } from "@/lib/event";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

// Rubik v krepkih rezih za imena in številke (čitljivo, ima čšž).
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "900"],
});

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

// Lacquer: sprej s kapljami za poudarke (cene, ZASTONJ, SSR). Brez čšž.
const lacquer = Lacquer({
  variable: "--font-lacquer",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://metamorfoza.art",
  ),
  title: `${EVENT.title} — ${EVENT.dateLabel}, ${EVENT.venue}`,
  description:
    "Deep Sea Extravaganza Special se vrača izpod morskega dna. Akvatične modne kreacije, polnočne sirene in bitje Cnth'ula. Sobota, 12. 9. 2026 ob 22:30, Channel Zero, Ljubljana.",
  openGraph: {
    title: EVENT.title,
    description:
      "Sobota, 12. 9. 2026 ob 22:30 · Channel Zero, Ljubljana · Dress code: your favorite sea creature.",
    locale: "sl_SI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} ${rockSalt.variable} ${sedgwick.variable} ${lacquer.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SeaBackground />
        <Bubbles />
        <ClickBubbles />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
