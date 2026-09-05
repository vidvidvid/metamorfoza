import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Bubbles } from "@/components/bubbles";
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

// Rubik v krepkih rezih se ujema z napisi na logotipu (vol. 3 / DEEP SEA).
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "900"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SeaBackground />
        <Bubbles />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
