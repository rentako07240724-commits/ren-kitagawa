import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
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
      className={`${archivoBlack.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
