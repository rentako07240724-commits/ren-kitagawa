import type { Metadata } from "next";
import { Cormorant, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "REN KITAGAWA",
  description: "MODERN SHARP — 計算された沈黙、そして意図されたノイズ。",
  openGraph: {
    title: "REN KITAGAWA",
    description: "MODERN SHARP — 計算された沈黙、そして意図されたノイズ。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${cormorant.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
