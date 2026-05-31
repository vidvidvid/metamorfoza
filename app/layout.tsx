import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Caveat,
  Rubik_Distressed,
} from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Bubbles } from "@/components/bubbles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
});

const rubikDistressed = Rubik_Distressed({
  variable: "--font-distressed",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Metamorfoza — Open Call: Globočine morja",
  description:
    "Soustvarjaj ljubljansko podzemlje. Odprt razpis za mlade oblikovalce — tema: Globočine morja. Prijave do 1. 6. 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} ${rubikDistressed.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Bubbles />
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
