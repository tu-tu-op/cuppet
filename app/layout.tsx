import type { Metadata } from "next";
import { Comfortaa, Inter } from "next/font/google";
import "./globals.css";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cuppet",
  description: "Scheduled agents that run across the apps you already use.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${comfortaa.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
