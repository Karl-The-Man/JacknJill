import type { Metadata } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans"
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "Jack & Jill Dashboard Replica",
  description: "Static full-screen UI recreation of the Jack & Jill jobs dashboard."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
