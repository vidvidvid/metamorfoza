import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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

// Pisave posamezne edicije (grafiti za Deep Sea, Wet Paint / Nosifer /
// Baloo za Deep Throat) so naložene v layoutu edicije, da jih druge strani ne vlečejo.

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? EVENT.siteUrl),
  title: `${EVENT.title} - ${EVENT.dateLabel}, ${EVENT.venue}`,
  description:
    "Noč čarovnic: Metamorfoza x Channel Zero. Nodoshin 喉神, tekmovanje mask z glavno nagrado tattoo do 100 €, fluorescentni dark chill zone pod blacklightom. Sobota, 31. 10. 2026 ob 22:30, Channel Zero, Ljubljana. Dress code: maske.",
  openGraph: {
    title: EVENT.title,
    description:
      "Sobota, 31. 10. 2026 ob 22:30 · Channel Zero, Ljubljana · Noč čarovnic · Dress code: maske (obvezno).",
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
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
